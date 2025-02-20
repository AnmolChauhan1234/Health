from django.urls import path
from .views import BillHistoryView, BillDetailsByBillingView

urlpatterns = [
    path('show-history/', BillHistoryView.as_view(), name='bill_history'),
    path('history-show-bill-details/', BillDetailsByBillingView.as_view(), name='history_show_bill_details'),
]
