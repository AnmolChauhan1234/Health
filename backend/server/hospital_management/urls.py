from django.urls import path
from .views import AddDoctorView, AddServiceView, AddTreatmentView, DeleteDoctorView, DeleteServiceView, DeleteTreatmentView, EditHospitalManagement, SearchDoctorView, SearchServiceView, SearchTreatmentAPIView

urlpatterns = [
    path('add-doctor/', AddDoctorView.as_view(), name='add_doctor'),
    path('add-service/', AddServiceView.as_view(), name='add_service'),
    path('add-treatment/', AddTreatmentView.as_view(), name='add_treatment'),
    path('delete-doctor/', DeleteDoctorView.as_view(), name='delete_doctor'),
    path('delete-service/', DeleteServiceView.as_view(), name='delete_service'),
    path('delete-treatment/', DeleteTreatmentView.as_view(), name='delete_treatment'),
    path('update-facilities-in-hospital/', EditHospitalManagement.as_view(), name='update_facilities_in_hospital'),
    path("search-doctors/", SearchDoctorView.as_view(), name="search_doctors"),
    path("search-services/", SearchServiceView.as_view(), name="search_services"),
    path("search-treatments/", SearchTreatmentAPIView.as_view(), name="search_treatments"),
]