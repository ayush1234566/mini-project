import requests
import json

print("=== Testing FastAPI 422 Error Scenarios ===\n")

base_url = "http://127.0.0.1:8083"

# Test 1: Correct data (should work)
print("1. Testing with CORRECT data:")
correct_data = {
    "StudyHours": 19,
    "Attendance": 64,
    "Resources": 1,
    "Extracurricular": 0,
    "Motivation": 0,
    "Internet": 1,
    "Gender": 0,
    "Age": 19,
    "OnlineCourses": 8,
    "Discussions": 1,
    "AssignmentCompletion": 59,
    "ExamScore": 40,
    "EduTech": 0,
    "StressLevel": 1,
    "FinalGrade": 3
}

try:
    response = requests.post(f"{base_url}/predict-style", json=correct_data, timeout=10)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"✅ SUCCESS: {response.json()}")
    else:
        print(f"❌ ERROR: {response.text}")
except Exception as e:
    print(f"❌ Exception: {e}")

print("\n" + "="*50)

# Test 2: Wrong data type (string instead of int)
print("2. Testing with WRONG data types (strings instead of integers):")
wrong_data_types = {
    "StudyHours": "19",  # String instead of int
    "Attendance": "64",  # String instead of int
    "Resources": 1,
    "Extracurricular": 0,
    "Motivation": 0,
    "Internet": 1,
    "Gender": 0,
    "Age": 19,
    "OnlineCourses": 8,
    "Discussions": 1,
    "AssignmentCompletion": 59,
    "ExamScore": 40,
    "EduTech": 0,
    "StressLevel": 1,
    "FinalGrade": 3
}

try:
    response = requests.post(f"{base_url}/predict-style", json=wrong_data_types, timeout=10)
    print(f"Status: {response.status_code}")
    if response.status_code == 422:
        print(f"❌ 422 ERROR (as expected): {response.json()}")
    else:
        print(f"Response: {response.text}")
except Exception as e:
    print(f"❌ Exception: {e}")

print("\n" + "="*50)

# Test 3: Missing required fields
print("3. Testing with MISSING required fields:")
missing_fields = {
    "StudyHours": 19,
    "Attendance": 64,
    # Missing other required fields
}

try:
    response = requests.post(f"{base_url}/predict-style", json=missing_fields, timeout=10)
    print(f"Status: {response.status_code}")
    if response.status_code == 422:
        print(f"❌ 422 ERROR (as expected): {response.json()}")
    else:
        print(f"Response: {response.text}")
except Exception as e:
    print(f"❌ Exception: {e}")

print("\n" + "="*50 + "\n")
print("If test 1 works but you're getting 422 errors in the browser:")
print("- Check that all fields are integers (not strings)")
print("- Make sure all required fields are present")
print("- Check the browser's developer console for more details")