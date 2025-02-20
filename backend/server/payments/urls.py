from django.urls import path
from .views import SearchDoctorView, SearchServiceView, SearchTreatmentAPIView, SearchUserAPIView, CreateBill, AddBillDetails, DeleteBillDetails

urlpatterns = [
    path("search-doctors/", SearchDoctorView.as_view(), name="search_doctors"),
    path("search-services/", SearchServiceView.as_view(), name="search_services"),
    path("search-treatments/", SearchTreatmentAPIView.as_view(), name="search_treatments"),
    path("search-users/", SearchUserAPIView.as_view(), name="search_users"),
    path("create-bill/", CreateBill.as_view(), name="create_bill"),
    path("add-bill-details/", AddBillDetails.as_view(), name="add_bill_details"),
    path("delete-bill-details/", DeleteBillDetails.as_view(), name="delete_bill_details"),
]