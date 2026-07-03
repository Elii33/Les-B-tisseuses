from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import time
import httpx
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'change_me')
ADMIN_SECRET = os.environ.get('ADMIN_SECRET', 'change_me_secret')
MAILERLITE_API_KEY = os.environ.get('MAILERLITE_API_KEY', '')

app = FastAPI(title="Les Bâtisseuses API")
api_router = APIRouter(prefix="/api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://les-b-tisseuses.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# In-memory token store (simple, resets on backend restart — acceptable for MVP)
active_tokens = {}  # token -> expires_at
TOKEN_TTL_SECONDS = 60 * 60 * 8  # 8 hours


def _issue_token() -> str:
    token = secrets.token_urlsafe(32)
    active_tokens[token] = time.time() + TOKEN_TTL_SECONDS
    return token


def _verify_token(auth: Optional[str]) -> None:
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Non autorisé")
    token = auth.split(" ", 1)[1]
    exp = active_tokens.get(token)
    if not exp or exp < time.time():
        active_tokens.pop(token, None)
        raise HTTPException(status_code=401, detail="Session expirée")


# ---------- Models ----------
class LeadCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    city: Optional[str] = Field(default=None, max_length=80)


class Lead(BaseModel):
    id: str
    first_name: str
    email: str
    city: Optional[str] = None
    created_at: datetime


class AdminLogin(BaseModel):
    password: str


class TokenResp(BaseModel):
    token: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Les Bâtisseuses API is running"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    email = payload.email.lower().strip()
    first_name = payload.first_name.strip()
    city = (payload.city or "").strip() or None

    existing = await db.leads.find_one({"email": email})
    if existing:
        return Lead(
            id=existing["id"],
            first_name=existing["first_name"],
            email=existing["email"],
            city=existing.get("city"),
            created_at=existing["created_at"],
        )
    doc = {
        "id": str(uuid.uuid4()),
        "first_name": first_name,
        "email": email,
        "city": city,
        "created_at": datetime.utcnow(),
        "mailerlite_synced": False,
    }
    await db.leads.insert_one(doc)

    # Sync to MailerLite (non-blocking on error)
    if MAILERLITE_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=8.0) as http:
                fields = {"name": first_name}
                if city:
                    fields["city"] = city
                resp = await http.post(
                    "https://connect.mailerlite.com/api/subscribers",
                    headers={
                        "Authorization": f"Bearer {MAILERLITE_API_KEY}",
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    json={
                        "email": email,
                        "fields": fields,
                        "status": "active",
                        "groups": ["191825749102036199"]
                    },
                )
                if resp.status_code in (200, 201):
                    await db.leads.update_one({"id": doc["id"]}, {"$set": {"mailerlite_synced": True}})
                else:
                    logger.warning(f"MailerLite sync failed ({resp.status_code}): {resp.text[:200]}")
        except Exception as e:
            logger.warning(f"MailerLite sync exception: {e}")

    return Lead(**{k: v for k, v in doc.items() if k in ("id", "first_name", "email", "city", "created_at")})


@api_router.post("/admin/login", response_model=TokenResp)
async def admin_login(payload: AdminLogin):
    if payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")
    return TokenResp(token=_issue_token())


@api_router.get("/admin/leads", response_model=List[Lead])
async def admin_leads(authorization: Optional[str] = Header(default=None)):
    _verify_token(authorization)
    docs = await db.leads.find().sort("created_at", -1).to_list(5000)
    return [
        Lead(
            id=d["id"],
            first_name=d["first_name"],
            email=d["email"],
            city=d.get("city"),
            created_at=d["created_at"],
        )
        for d in docs
    ]


@api_router.delete("/admin/leads/{lead_id}")
async def admin_delete_lead(lead_id: str, authorization: Optional[str] = Header(default=None)):
    _verify_token(authorization)
    res = await db.leads.delete_one({"id": lead_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead introuvable")
    return {"ok": True}

app.include_router(api_router)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
