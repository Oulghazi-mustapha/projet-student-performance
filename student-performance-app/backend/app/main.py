from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import StudentData, VisualizationRequest
from .ml_model import load_or_train_model
import pandas as pd

# Initialisation de l'application
app = FastAPI(
    title="Student Performance API",
    version="1.0.0",
    description="Predicts exam success and visualizes data"
)

# Middleware CORS pour autoriser les requêtes front-end
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger ou entraîner le modèle
model = load_or_train_model("data/students.csv")

@app.get("/")
def home():
    return {"message": "Student Performance API is running"}

@app.post("/predict")
def predict(data: StudentData):
    try:
        # Préparer les données entrantes
        input_data = {
            "gender": data.gender,
            "race/ethnicity": data.race_ethnicity,
            "parental level of education": data.parental_level_of_education,
            "lunch": data.lunch,
            "test preparation course": data.test_preparation_course,
            "math score": data.math_score,
            "reading score": data.reading_score,
            "writing score": data.writing_score
        }

        # Transformer en DataFrame et encoder
        df = pd.DataFrame([input_data])
        df = pd.get_dummies(df)

        # Ajouter les colonnes manquantes
        for col in model.feature_names_in_:
            if col not in df.columns:
                df[col] = 0
        
        # Réordonner les colonnes
        df = df[model.feature_names_in_]

        # Faire la prédiction
        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1]

        return {
            "prediction": bool(prediction),
            "probability": round(float(probability), 4),
            "message": "✅ Likely to pass" if prediction else "❌ Likely to fail"
        }

    except Exception as e:
        print("Prediction error:", str(e))
        raise HTTPException(status_code=400, detail="Prediction failed: " + str(e))

@app.post("/visualize")
def visualize(request: VisualizationRequest):
    try:
        df = pd.read_csv("data/students.csv")

        if request.chart_type == "bar":
            data = df.groupby(request.x_axis)[request.y_axis].mean().reset_index()
            return {
                "x": data[request.x_axis].tolist(),
                "y": data[request.y_axis].tolist(),
                "type": "bar"
            }

        elif request.chart_type in ["line", "scatter"]:
            return {
                "x": df[request.x_axis].tolist(),
                "y": df[request.y_axis].tolist(),
                "type": request.chart_type
            }

        else:
            raise HTTPException(status_code=400, detail="Invalid chart type")

    except Exception as e:
        print("Visualization error:", str(e))
        raise HTTPException(status_code=400, detail="Visualization failed: " + str(e))
