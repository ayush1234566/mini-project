import joblib
import pandas as pd

# Load models
model = joblib.load('model.pkl')
preprocessor = joblib.load('preprocessor.pkl')

# Test data (same as in the API test)
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

print("Testing offline prediction...")
try:
    # Convert to DataFrame
    input_df = pd.DataFrame([test_data])
    print("Input DataFrame shape:", input_df.shape)
    print("Input DataFrame columns:", input_df.columns.tolist())
    
    # Expected column order
    expected_columns = [
        'StudyHours', 'Attendance', 'Resources', 'Extracurricular', 'Motivation', 
        'Internet', 'Gender', 'Age', 'OnlineCourses', 'Discussions', 
        'AssignmentCompletion', 'ExamScore', 'EduTech', 'StressLevel', 'FinalGrade'
    ]
    
    # Reorder columns
    input_df = input_df[expected_columns]
    print("Reordered DataFrame columns:", input_df.columns.tolist())
    
    # Apply preprocessing
    processed_input = preprocessor.transform(input_df)
    print("Processed input shape:", processed_input.shape)
    
    # Make prediction
    prediction = model.predict(processed_input)
    print("Prediction:", prediction[0])
    print("Prediction type:", type(prediction[0]))
    
    print("SUCCESS: Offline prediction works!")
    
except Exception as e:
    print(f"ERROR: {str(e)}")
    import traceback
    traceback.print_exc()