import pandas as pd

df = pd.read_csv('student_performance.csv')
print("Data types:")
print(df.dtypes)
print("\nSample data:")
print(df.head(2))
print("\nUnique values for categorical columns:")
categorical_cols = ['Gender', 'Motivation', 'Extracurricular']
for col in categorical_cols:
    print(f'{col}: {sorted(df[col].unique())}')