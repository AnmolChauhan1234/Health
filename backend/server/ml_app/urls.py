from django.urls import path
from .views import SymptomPredictionView, NearbyHospitalsBySymptomView

urlpatterns = [
    path("predict/", SymptomPredictionView.as_view(), name="ml_predict"),
    path("nearby/", NearbyHospitalsBySymptomView.as_view(), name="ml_nearby"),
]
