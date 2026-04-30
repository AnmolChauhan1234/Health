import os
import joblib
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

# Load the ML model when the server starts
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')

try:
    ML_MODEL = joblib.load(MODEL_PATH)
    print(f"✅ ML model loaded from {MODEL_PATH}")
except Exception as e:
    print(f"⚠ Failed to load ML model: {e}")
    ML_MODEL = None


class SymptomPredictionView(APIView):
    """
    API View to predict medical specializations based on symptoms using ML model.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Accepts JSON payload with symptoms and returns predicted specializations.
        
        Expected payload:
        {
            "symptom": "fever and cough"
        }
        
        Returns:
        {
            "prediction": ["General Medicine", "Pulmonology"]
        }
        """
        symptom = request.data.get("symptom", "").strip().lower()
        
        if not symptom:
            return Response(
                {"error": "Symptom parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Use ML model for prediction
        predicted_specializations = self._predict_specialization(symptom)
        print("model res",predicted_specializations)

        return Response(
            {"prediction": predicted_specializations},
            status=status.HTTP_200_OK
        )

    def _predict_specialization(self, symptom):
        """
        Use ML model to predict specialist based on symptoms.
        """
        if ML_MODEL is None:
            # Fallback to default if model not loaded
            return ["General Physician"]
        
        try:
            prediction = ML_MODEL.predict([symptom])
            specialist = prediction[0] if prediction else "General Physician"
            # Map model output to similar specializations in the database
            specialist_map = {
                "Cardiologist": ["Cardiology", "Cardiologist"],
                "Neurologist": ["Neurology", "Neurologist"],
                "Dermatologist": ["Dermatology", "Dermatologist"],
                "General Physician": ["General Medicine", "General Physician"],
                "Gastroenterologist": ["Gastroenterology", "Gastroenterologist"],
                "Orthopedist": ["Orthopedics", "Orthopedist"],
                "Pulmonologist": ["Pulmonology", "Pulmonologist"],
                "Ophthalmologist": ["Ophthalmology", "Ophthalmologist"],
                "ENT Specialist": ["ENT", "Otorhinolaryngology"],
                "Psychiatrist": ["Psychiatry", "Psychology"],
            }
            return specialist_map.get(specialist, ["General Medicine"])
        except Exception as e:
            print(f"ML prediction error: {e}")
            return ["General Medicine"]


class NearbyHospitalsBySymptomView(APIView):
    """
    API View to get nearby hospitals that can treat a given symptom.
    Combines symptom prediction with hospital search.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Accepts JSON payload with symptom, latitude, and longitude.
        
        Expected payload:
        {
            "symptom": "chest pain",
            "lat": 28.7041,
            "lng": 77.1025
        }
        
        Returns:
        {
            "prediction": ["Cardiology", "General Medicine"],
            "specializations": ["Cardiology", "General Medicine"]
        }
        """
        symptom = request.data.get("symptom", "").strip().lower()
        
        if not symptom:
            return Response(
                {"error": "Symptom parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Use ML model for prediction
        predicted_specializations = self._predict_specialization(symptom)

        return Response(
            {
                "prediction": predicted_specializations,
                "specializations": predicted_specializations
            },
            status=status.HTTP_200_OK
        )

    def _predict_specialization(self, symptom):
        """
        Use ML model to predict specialist based on symptoms.
        """
        if ML_MODEL is None:
            return ["General Physician"]
        
        try:
            prediction = ML_MODEL.predict([symptom])
            specialist = prediction[0] if prediction else "General Physician"
            specialist_map = {
                "Cardiologist": ["Cardiology", "Cardiologist"],
                "Neurologist": ["Neurology", "Neurologist"],
                "Dermatologist": ["Dermatology", "Dermatologist"],
                "General Physician": ["General Medicine", "General Physician"],
                "Gastroenterologist": ["Gastroenterology", "Gastroenterologist"],
                "Orthopedist": ["Orthopedics", "Orthopedist"],
                "Pulmonologist": ["Pulmonology", "Pulmonologist"],
                "Ophthalmologist": ["Ophthalmology", "Ophthalmologist"],
                "ENT Specialist": ["ENT", "Otorhinolaryngology"],
                "Psychiatrist": ["Psychiatry", "Psychology"],
            }
            return specialist_map.get(specialist, ["General Medicine"])
        except Exception as e:
            print(f"ML prediction error: {e}")
            return ["General Medicine"]
