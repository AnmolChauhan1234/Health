from django.shortcuts import render
import os
import pickle
import json
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sklearn.feature_extraction.text import TfidfTransformer, CountVectorizer

# Load model paths
BASE_DIR = os.path.dirname(__file__)
MODEL_FILES = {
    "service": {
        "model": "model.pkl",
        "vectorizer": "vectorizer.pkl",
        "transformer": "tfidf_transformer.pkl",
    }
}

# Load models, vectorizers, and transformers
models = {}
vectorizers = {}
transformers = {}

for key, paths in MODEL_FILES.items():
    try:
        with open(os.path.join(BASE_DIR, f"../model/{paths['model']}"), "rb") as file:
            models[key] = pickle.load(file)
        with open(os.path.join(BASE_DIR, f"../model/{paths['vectorizer']}"), "rb") as file:
            vectorizers[key] = pickle.load(file)
        with open(os.path.join(BASE_DIR, f"../model/{paths['transformer']}"), "rb") as file:
            transformers[key] = pickle.load(file)
    except FileNotFoundError as e:
        print(f"Error loading {key} model: {e}")

# Department Mapping

DEPARTMENT_MAPPING = { 
    1: "Cardiology",
    2: "Neurology",
    3: "Orthopedic",
    4: "Oncology",
    5: "Surgery",
    6: "Maternity",
    7: "Ophthalmology",
    8: "Otolaryngology"
}

DEPARTMENT_TO_SPECIALIZATIONS = {
    1: ["Cardiologist"],
    2: ["Neurosurgery", "Neurologist", "Psychiatrist", "Addiction Psychiatrist", "Neuro Physiotherapist", "Therapy"],
    3: ["Orthopedic surgeon", "Joint Replacement Surgeon", "Spine And Pain Specialist", "Physiotherapist"],
    4: ["Radiation Oncologist", "Surgical Oncologist", "Medical Oncologist"],
    5: [
        "General Physician", "Gastroenterologist", "Vascular Surgeon", "Pulmonologist",
        "Tuberculous and chest Diseases Specialist", "Special Interest in Diabetology",
        "Radiologist", "Pediatric Surgeon", "Laparoscopic Surgeon", "Pediatrician",
        "Dermatologist", "Homeopath", "Ayurveda", "Urologist", "Emergency", "Diagnostics",
        "Medical Checkups"
    ],
    6: ["Gynecologist", "Infertility Specialist"],
    7: ["Ophthalmologist/ Eye Surgeon"],
    8: ["ENT Surgeon", "Dentist"]
}


@csrf_exempt
def predict(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            query_type = data.get("querytype", "").strip().lower()
            latitude = data.get("latitude", "")
            longitude = data.get("longitude", "")
            input_text = data.get("text", "").strip()

            if not input_text:
                return JsonResponse({"error": "No input text provided"}, status=400)

            if query_type not in models:
                return JsonResponse({"error": "Invalid query type"}, status=400)

            vectorizer = vectorizers[query_type]
            transformer = transformers[query_type]
            model = models[query_type]

            X_counts = vectorizer.transform([input_text])
            X_tfidf = transformer.transform(X_counts)
            prediction = model.predict(X_tfidf).tolist()

            if query_type == "service":
                prediction = DEPARTMENT_TO_SPECIALIZATIONS.get(prediction[0], "Not found")

            return JsonResponse({
                "query_type": query_type,
                "latitude": latitude,
                "longitude": longitude,
                "prediction": prediction
            })

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "Send a POST request with JSON data"})
