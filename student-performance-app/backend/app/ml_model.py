import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

def load_or_train_model(data_path: str):
    df = pd.read_csv(data_path)

    # Créer la variable cible "pass" si moyenne >= 60
    df['pass'] = ((df['math score'] + df['reading score'] + df['writing score']) / 3) >= 60

    # One-hot encoding des variables catégoriques
    df = pd.get_dummies(df, columns=[
        "gender", "race/ethnicity", 
        "parental level of education", "lunch", 
        "test preparation course"
    ])

    # Sélection des features
    X = df.drop(['pass', 'math score', 'reading score', 'writing score'], axis=1)
    y = df['pass']

    # Split train/test
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Modèle
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Enregistrer (si tu veux l’utiliser plus tard)
    joblib.dump(model, "model.joblib")
    print("✅ Nouveau modèle entraîné et sauvegardé.")

    return model
