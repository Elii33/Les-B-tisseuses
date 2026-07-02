import requests
import os
from dotenv import load_dotenv
from pathlib import Path

# Load frontend .env to get REACT_APP_BACKEND_URL
frontend_env = Path("/app/frontend/.env")
load_dotenv(frontend_env)

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "")
API_BASE = f"{BASE_URL}/api"

print(f"Testing API at: {API_BASE}")
print("=" * 80)

# Test results tracking
test_results = []
created_lead_id = None
auth_token = None


def test_endpoint(name, method, url, expected_status, **kwargs):
    """Helper function to test an endpoint and track results"""
    global test_results
    try:
        if method == "GET":
            response = requests.get(url, **kwargs)
        elif method == "POST":
            response = requests.post(url, **kwargs)
        elif method == "DELETE":
            response = requests.delete(url, **kwargs)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        success = response.status_code == expected_status
        result = {
            "name": name,
            "success": success,
            "status_code": response.status_code,
            "expected_status": expected_status,
            "response": response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text
        }
        test_results.append(result)
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {name}")
        print(f"   Status: {response.status_code} (expected {expected_status})")
        if not success or response.status_code >= 400:
            print(f"   Response: {result['response']}")
        print()
        
        return response, success
    except Exception as e:
        result = {
            "name": name,
            "success": False,
            "error": str(e)
        }
        test_results.append(result)
        print(f"❌ {name}")
        print(f"   Error: {e}")
        print()
        return None, False


# Test 1: Health check
print("Test 1: GET /api/ - Health check")
response, success = test_endpoint(
    "Health check",
    "GET",
    f"{API_BASE}/",
    200
)
if success and response:
    data = response.json()
    if data.get("message") == "Les Bâtisseuses API is running":
        print("   ✓ Correct message returned")
    else:
        print(f"   ⚠ Unexpected message: {data}")
print()

# Test 2: Create a lead
print("Test 2: POST /api/leads - Create a lead")
import time
unique_email = f"regression.test.{int(time.time())}@example.com"
lead_data = {
    "first_name": "Sophie",
    "email": unique_email,
    "city": "Bordeaux"
}
print(f"   Using unique email: {unique_email}")
response, success = test_endpoint(
    "Create lead",
    "POST",
    f"{API_BASE}/leads",
    200,
    json=lead_data
)
if success and response:
    data = response.json()
    created_lead_id = data.get("id")
    print(f"   ✓ Lead created with ID: {created_lead_id}")
    if "created_at" in data:
        print(f"   ✓ created_at field present")
    else:
        print(f"   ⚠ created_at field missing")
print()

# Test 3: Idempotency - create same lead again
print("Test 3: POST /api/leads - Idempotency test (same email)")
response, success = test_endpoint(
    "Create lead (idempotent)",
    "POST",
    f"{API_BASE}/leads",
    200,
    json=lead_data
)
if success and response:
    data = response.json()
    returned_id = data.get("id")
    if returned_id == created_lead_id:
        print(f"   ✓ Idempotent: returned same lead ID {returned_id}")
    else:
        print(f"   ❌ Not idempotent: got different ID {returned_id} vs {created_lead_id}")
print()

# Test 4: Invalid email validation
print("Test 4: POST /api/leads - Invalid email validation")
invalid_lead = {
    "first_name": "Test",
    "email": "not-an-email",
    "city": "Paris"
}
response, success = test_endpoint(
    "Create lead with invalid email",
    "POST",
    f"{API_BASE}/leads",
    422,
    json=invalid_lead
)
if success:
    print("   ✓ Correctly rejected invalid email")
print()

# Test 5: Admin login with wrong password
print("Test 5: POST /api/admin/login - Wrong password")
response, success = test_endpoint(
    "Admin login (wrong password)",
    "POST",
    f"{API_BASE}/admin/login",
    401,
    json={"password": "WrongPassword"}
)
if success:
    print("   ✓ Correctly rejected wrong password")
print()

# Test 6: Admin login with correct password
print("Test 6: POST /api/admin/login - Correct password")
response, success = test_endpoint(
    "Admin login (correct password)",
    "POST",
    f"{API_BASE}/admin/login",
    200,
    json={"password": "Elisa33600"}
)
if success and response:
    data = response.json()
    auth_token = data.get("token")
    if auth_token:
        print(f"   ✓ Token received: {auth_token[:20]}...")
    else:
        print(f"   ❌ No token in response")
print()

# Test 7: Get leads without auth
print("Test 7: GET /api/admin/leads - Without authentication")
response, success = test_endpoint(
    "Get leads (no auth)",
    "GET",
    f"{API_BASE}/admin/leads",
    401
)
if success:
    print("   ✓ Correctly rejected request without auth")
print()

# Test 8: Get leads with auth
print("Test 8: GET /api/admin/leads - With authentication")
if auth_token:
    response, success = test_endpoint(
        "Get leads (with auth)",
        "GET",
        f"{API_BASE}/admin/leads",
        200,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    if success and response:
        data = response.json()
        if isinstance(data, list):
            print(f"   ✓ Received list of {len(data)} leads")
            # Check if our created lead is in the list
            if created_lead_id:
                found = any(lead.get("id") == created_lead_id for lead in data)
                if found:
                    print(f"   ✓ Created lead found in list")
                else:
                    print(f"   ⚠ Created lead not found in list")
        else:
            print(f"   ❌ Response is not a list: {type(data)}")
else:
    print("   ⚠ Skipping test - no auth token available")
print()

# Test 9: Delete lead with auth
print("Test 9: DELETE /api/admin/leads/{id} - With authentication")
if auth_token and created_lead_id:
    response, success = test_endpoint(
        "Delete lead (with auth)",
        "DELETE",
        f"{API_BASE}/admin/leads/{created_lead_id}",
        200,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    if success and response:
        data = response.json()
        if data.get("ok") == True:
            print(f"   ✓ Lead deleted successfully")
        else:
            print(f"   ⚠ Unexpected response: {data}")
else:
    print("   ⚠ Skipping test - no auth token or lead ID available")
print()

# Test 10: Delete non-existing lead
print("Test 10: DELETE /api/admin/leads/{id} - Non-existing lead")
if auth_token:
    fake_id = "00000000-0000-0000-0000-000000000000"
    response, success = test_endpoint(
        "Delete non-existing lead",
        "DELETE",
        f"{API_BASE}/admin/leads/{fake_id}",
        404,
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    if success:
        print(f"   ✓ Correctly returned 404 for non-existing lead")
else:
    print("   ⚠ Skipping test - no auth token available")
print()

# Summary
print("=" * 80)
print("TEST SUMMARY")
print("=" * 80)
total_tests = len(test_results)
passed_tests = sum(1 for t in test_results if t.get("success", False))
failed_tests = total_tests - passed_tests

print(f"Total tests: {total_tests}")
print(f"Passed: {passed_tests}")
print(f"Failed: {failed_tests}")
print()

if failed_tests > 0:
    print("FAILED TESTS:")
    for test in test_results:
        if not test.get("success", False):
            print(f"  ❌ {test['name']}")
            if "error" in test:
                print(f"     Error: {test['error']}")
            elif "status_code" in test:
                print(f"     Got {test['status_code']}, expected {test['expected_status']}")
    print()

if passed_tests == total_tests:
    print("🎉 ALL TESTS PASSED!")
else:
    print(f"⚠️  {failed_tests} test(s) failed")

exit(0 if passed_tests == total_tests else 1)
