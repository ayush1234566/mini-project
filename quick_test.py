import requests
import json

# Simple test to identify 422 error
url = "http://127.0.0.1:8083/predict-style"

# Correct data format
data = {
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

print("Testing API...")
try:
    response = requests.post(url, json=data, timeout=5)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")