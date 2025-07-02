from django.db import models
from accounts.models import Patient, Hospital
# Create your models here.


class BillHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True, blank=True)
    billing = models.ForeignKey('payments.Billing', on_delete=models.CASCADE)  # Reference to the original bill
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=[])
    updated_at = models.DateTimeField(auto_now=True)  # Track when history was updated

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        from payments.models import Billing  # Import inside method to prevent circular import
        self._meta.get_field('status').choices = Billing.BILL_STATUS_CHOICES  # Set choices dynamically


    def __str__(self):
        return f"History - {self.patient.user.full_name if self.patient else 'Unknown'} - {self.total_amount}"



