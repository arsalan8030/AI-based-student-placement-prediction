import sys
import joblib
import pandas as pd

model = joblib.load("model.pkl")

cgpa = float(sys.argv[1])
internships = int(sys.argv[2])
aptitude = float(sys.argv[3])
projects = int(sys.argv[4])
communication = float(sys.argv[5])

data = pd.DataFrame([[cgpa, internships, aptitude, projects, communication]],
columns=['cgpa','internships','aptitude','projects','communication'])

prediction = model.predict(data)

print("Placed" if prediction[0] == 1 else "Not Placed")