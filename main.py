import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ValidationError, Field
from motor.motor_asyncio import AsyncIOMotorClient
import datetime
import uuid
from bson import ObjectId

# --- 1. Load the trained ML model and preprocessor ---
try:
    model = joblib.load('model.pkl')
    preprocessor = joblib.load('preprocessor.pkl')
except FileNotFoundError:
    raise RuntimeError("Model and preprocessor files not found. Have you run model training?")

# --- 2. MongoDB Configuration ---
MONGODB_URL = "mongodb://localhost:27017"
DATABASE_NAME = "admin"

# --- 3. Initialize FastAPI ---
app = FastAPI(
    title="Implicit Learning Style Detection API",
    description="API to predict a student's learning style based on their behavior."
)

# --- 4. CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 5. MongoDB Connection Events ---
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(MONGODB_URL)
    app.mongodb = app.mongodb_client[DATABASE_NAME]
    # Optional: add index for prediction_id
    await app.mongodb["predictions"].create_index("prediction_id", unique=True)
    print("✅ Connected to MongoDB!")

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    print("❌ Disconnected from MongoDB.")

# --- 6. Custom Exception Handler ---
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error_details = []
    for error in exc.errors():
        field_name = " -> ".join(str(loc) for loc in error["loc"])
        error_details.append({
            "field": field_name,
            "message": error["msg"],
            "invalid_value": error.get("input", "N/A")
        })
    
    return JSONResponse(
        status_code=422,
        content={
            "error": "Validation Error",
            "message": "The provided data does not match the expected format",
            "details": error_details
        }
    )

# --- 7. Root Endpoint ---
@app.get("/")
def root():
    return {"message": "Learning Style Detection API is running!", "status": "healthy"}

# --- 8. Pydantic Model ---
class StudentData(BaseModel):
    StudyHours: int = Field(..., ge=0, le=100)
    Attendance: int = Field(..., ge=0, le=100)
    Resources: int = Field(..., ge=0, le=10)
    Extracurricular: int = Field(..., ge=0, le=1)
    Motivation: int = Field(..., ge=0, le=2)
    Internet: int = Field(..., ge=0, le=1)
    Gender: int = Field(..., ge=0, le=1)
    Age: int = Field(..., ge=10, le=100)
    OnlineCourses: int = Field(..., ge=0, le=50)
    Discussions: int = Field(..., ge=0, le=10)
    AssignmentCompletion: int = Field(..., ge=0, le=100)
    ExamScore: int = Field(..., ge=0, le=100)
    EduTech: int = Field(..., ge=0, le=1)
    StressLevel: int = Field(..., ge=0, le=10)
    FinalGrade: int = Field(..., ge=0, le=10)

# --- 9. Prediction Endpoint ---
@app.post("/predict-style")
async def predict_learning_style(data: StudentData):
    try:
        input_dict = data.dict()
        input_df = pd.DataFrame([input_dict])

        expected_columns = [
            'StudyHours', 'Attendance', 'Resources', 'Extracurricular', 'Motivation', 
            'Internet', 'Gender', 'Age', 'OnlineCourses', 'Discussions', 
            'AssignmentCompletion', 'ExamScore', 'EduTech', 'StressLevel', 'FinalGrade'
        ]
        input_df = input_df[expected_columns]

        processed_input = preprocessor.transform(input_df)
        prediction = model.predict(processed_input)
        prediction_value = int(prediction[0])

        # Generate a custom UUID for easier lookups
        prediction_uuid = str(uuid.uuid4())

        result = await app.mongodb["predictions"].insert_one({
            "prediction_id": prediction_uuid,
            "learning_style": prediction_value,
            "predicted_at": datetime.datetime.utcnow().isoformat(),
            "user_data": input_dict
        })

        return {
            "learning_style_predicted": prediction_value,
            "database_id": str(result.inserted_id),   # Mongo ObjectId
            "prediction_id": prediction_uuid,         # UUID
            "status": "success",
            "input_received": input_dict
        }
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# --- 10. Get Recent Predictions ---
@app.get("/predictions")
async def get_predictions(limit: int = 10):
    try:
        cursor = app.mongodb["predictions"].find().sort("predicted_at", -1).limit(limit)
        predictions = await cursor.to_list(length=limit)

        for prediction in predictions:
            prediction["_id"] = str(prediction["_id"])

        return {
            "predictions": predictions,
            "count": len(predictions),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

# --- 11. Get Prediction by ID (UUID or Mongo ObjectId) ---
@app.get("/predictions/{prediction_id}")
async def get_prediction_by_id(prediction_id: str):
    try:
        if ObjectId.is_valid(prediction_id):
            query = {"_id": ObjectId(prediction_id)}
        else:
            query = {"prediction_id": prediction_id}

        prediction = await app.mongodb["predictions"].find_one(query)

        if prediction is None:
            raise HTTPException(status_code=404, detail="Prediction not found")

        prediction["_id"] = str(prediction["_id"])
        return {"prediction": prediction, "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
