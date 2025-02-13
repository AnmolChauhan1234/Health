from django.urls import path
from .views import NearbyHospitalsView, ShowHospitalDetails

urlpatterns = [
     path("get-nearby-hospitals/", NearbyHospitalsView.as_view(), name="get_nearby_hospitals"),
     path("view-hospital-details/", ShowHospitalDetails.as_view(), name="view_hospital_details")
]