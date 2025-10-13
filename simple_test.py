import json
import sys
try:
    import requests
    
    # Test data based on the actual data format (all integers)
    test_data = {
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
    print("Sending data:", json.dumps(test_data, indent=2))
    
    response = requests.post("http://127.0.0.1:8000/predict-style", json=test_data, timeout=10)
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        print("SUCCESS!")
        print(f"Predicted Learning Style: {result.get('learning_style_predicted')}")
    else:
        print("ERROR!")
        
except ImportError:
    print("requests library not available")
except requests.exceptions.ConnectionError:
    print("Could not connect to the API. Server might not be running.")
except requests.exceptions.Timeout:
    print("Request timed out")
except Exception as e:
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()