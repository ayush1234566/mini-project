import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

# Add a function to perform all preprocessing
def preprocess_data(df):
    # Separate features (X) and the target variable (y)
    X = df.drop('LearningStyle', axis=1)
    y = df['LearningStyle']

    # Identify categorical and numerical features
    categorical_features = ['Gender', 'LearningPreference', 'Motivation', 'Extracurricular']
    numerical_features = ['StudyHours', 'Attendance', 'AssignmentCompletion', 'OnlineCourses', 'Discussions', 'Resources', 'Internet', 'EduTech', 'StressLevel', 'ExamScore', 'FinalGrade', 'Age']

    # Create a preprocessor pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ],
        remainder='drop'
    )

    # Return the processed data and the preprocessor itself
    return preprocessor.fit_transform(X), y, preprocessor

# The main execution block
if __name__ == "__main__":
    df = pd.read_csv('Student Performance and Learning Behavior Dataset.csv')
    X_processed, y, preprocessor = preprocess_data(df)
    
    # Split the data here for training and testing
    X_train, X_test, y_train, y_test = train_test_split(
        X_processed, y, test_size=0.2, random_state=42, stratify=y
    )
    print("Data successfully processed and split.")
    print("Shape of the processed training data:", X_train.shape)
    print("Shape of the processed testing data:", X_test.shape)