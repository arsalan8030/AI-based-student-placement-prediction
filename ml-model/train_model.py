import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

data = pd.read_csv("dataset.csv")

X = data[['cgpa','internships','aptitude','projects','communication']]
y = data['placed']

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("Model trained successfully")