from django.urls import path
from .views import SearchDoctorView, SearchServiceView, SearchTreatmentAPIView

urlpatterns = [
    path("search-doctors/", SearchDoctorView.as_view(), name="search_doctors"),
    path("search-services/", SearchServiceView.as_view(), name="search_services"),
    path("search-treatments/", SearchTreatmentAPIView.as_view(), name="search_treatments"),
]