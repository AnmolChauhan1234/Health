from django.urls import path
from .views import NearbyHospitalsView

urlpatterns = [
     path("get-nearby-hospitals/", NearbyHospitalsView.as_view(), name="get_nearby_hospitals"),
]