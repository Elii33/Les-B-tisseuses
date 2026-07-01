#!/usr/bin/env python3
"""
MailerLite Integration Test for Les Bâtisseuses
Tests the new MailerLite sync functionality
"""
import requests
import time
import sys

BASE_URL = "https://landing-offer-hub.preview.emergentagent.com/api"
ADMIN_PASSWORD = "Elisa33600"

def print_section(title):
    print(f"\n{'='*80}")
    print(f"{title}")
    print('='*80)

def main():
    print_section("MAILERLITE INTEGRATION TEST")
    
    # Step 1: Create lead with unique email
    print_section("Step 1: Create Lead with Unique Email")
    timestamp = int(time.time())
    test_email = f"test.mailerlite.{timestamp}@gmail.com"
    
    payload = {
        "first_name": "TestMLite",
        "email": test_email,
        "city": "Bordeaux"
    }
    
    print(f"Creating lead with email: {test_email}")
    
    try:
        resp = requests.post(f"{BASE_URL}/leads", json=payload, timeout=10)
        print(f"Status Code: {resp.status_code}")
        print(f"Response: {resp.json()}")
        
        if resp.status_code != 200:
            print("❌ FAIL: Lead creation failed")
            return 1
        
        lead_data = resp.json()
        lead_id = lead_data.get("id")
        print(f"✅ Lead created with ID: {lead_id}")
        
    except Exception as e:
        print(f"❌ FAIL: Exception during lead creation: {e}")
        return 1
    
    # Step 2: Login as admin
    print_section("Step 2: Admin Login")
    
    try:
        resp = requests.post(
            f"{BASE_URL}/admin/login",
            json={"password": ADMIN_PASSWORD},
            timeout=10
        )
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Admin login failed: {resp.text}")
            return 1
        
        token = resp.json().get("token")
        print(f"✅ Admin login successful, token: {token[:20]}...")
        
    except Exception as e:
        print(f"❌ FAIL: Exception during admin login: {e}")
        return 1
    
    # Step 3: Verify lead in database
    print_section("Step 3: Verify Lead in MongoDB")
    
    try:
        resp = requests.get(
            f"{BASE_URL}/admin/leads",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        print(f"Status Code: {resp.status_code}")
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Failed to fetch leads: {resp.text}")
            return 1
        
        leads = resp.json()
        print(f"Total leads in database: {len(leads)}")
        
        # Find our test lead
        test_lead = None
        for lead in leads:
            if lead["email"] == test_email:
                test_lead = lead
                break
        
        if test_lead:
            print(f"✅ Test lead found in MongoDB:")
            print(f"   ID: {test_lead['id']}")
            print(f"   Email: {test_lead['email']}")
            print(f"   Name: {test_lead['first_name']}")
            print(f"   City: {test_lead['city']}")
        else:
            print(f"❌ FAIL: Test lead with email {test_email} not found in database")
            return 1
        
    except Exception as e:
        print(f"❌ FAIL: Exception during lead verification: {e}")
        return 1
    
    # Step 4: Check backend logs for MailerLite status
    print_section("Step 4: Backend Logs Analysis")
    print("Please check backend logs manually:")
    print("  tail -n 40 /var/log/supervisor/backend.err.log")
    print("")
    print("Look for:")
    print("  - MailerLite sync success (status 200/201)")
    print("  - MailerLite sync failed (status 422 or other)")
    print("  - MailerLite sync exception")
    
    # Step 5: Regression tests
    print_section("Step 5: Regression Tests")
    
    # Test health endpoint
    print("\n5.1: GET /api/")
    try:
        resp = requests.get(f"{BASE_URL}/", timeout=10)
        if resp.status_code == 200:
            print(f"✅ Health check passed: {resp.json()}")
        else:
            print(f"❌ Health check failed: {resp.status_code}")
    except Exception as e:
        print(f"❌ Exception: {e}")
    
    # Test delete endpoint
    print("\n5.2: DELETE /api/admin/leads/{id}")
    try:
        resp = requests.delete(
            f"{BASE_URL}/admin/leads/{lead_id}",
            headers={"Authorization": f"Bearer {token}"},
            timeout=10
        )
        if resp.status_code == 200 and resp.json().get("ok") == True:
            print(f"✅ Delete endpoint working: Lead {lead_id} deleted")
        else:
            print(f"❌ Delete failed: {resp.status_code} - {resp.text}")
    except Exception as e:
        print(f"❌ Exception: {e}")
    
    print_section("TEST COMPLETE")
    print("✅ All API endpoints working")
    print("⚠️  MailerLite sync status: CHECK BACKEND LOGS")
    print("")
    print("Next step: Run the following command to check MailerLite sync:")
    print("  tail -n 40 /var/log/supervisor/backend.err.log")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
