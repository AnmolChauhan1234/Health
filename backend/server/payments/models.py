from django.db import models

# Create your models here.



from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from datetime import timedelta

# Assuming Patient, Hospital, Doctor, ServiceHospital, and TreatmentHospital models are already defined
from accounts.models import Patient, Hospital
from hospital_management.models import HospitalService, HospitalTreatment, HospitalDoctor

# class Billing(models.Model):
#     BILL_STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('paid', 'Paid'),
#         ('cancelled', 'Cancelled'),
#     ]

#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
#     hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True, blank=True)
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
#     billing_date = models.DateTimeField(auto_now_add=True)
#     due_date = models.DateTimeField()
#     status = models.CharField(max_length=10, choices=BILL_STATUS_CHOICES, default='pending')
#     description = models.TextField(blank=True, null=True)

#     def save(self, *args, **kwargs):
#         # Auto-calculate total amount from billing details
#         self.total_amount = self.details.aggregate(models.Sum('amount'))['amount__sum'] or 0
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"Bill for {self.patient.user.full_name if self.patient else 'Unknown'} - {self.total_amount}"




class Billing(models.Model):
    BILL_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('cancelled', 'Cancelled'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0)])
    billing_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=BILL_STATUS_CHOICES, default='pending')
    description = models.TextField(blank=True, null=True)

    def update_total_amount(self):
        """Recalculate total amount from related BillingDetails."""
        self.total_amount = self.details.aggregate(models.Sum('amount'))['amount__sum'] or 0
        self.save(update_fields=['total_amount'])  # Save only the total_amount field

    def __str__(self):
        return f"Bill for {self.patient.user.full_name if self.patient else 'Unknown'} - {self.total_amount}"





# class BillingDetails(models.Model):
#     BILLING_ITEM_TYPES = [
#         ('service', 'Service'),
#         ('treatment', 'Treatment'),
#         ('doctor_fees', 'Doctor Fees'),
#         ('bed_charge', 'Bed Charge'),
#         ('other', 'Other'),
#     ]

#     billing = models.ForeignKey(Billing, on_delete=models.CASCADE, related_name='details')
#     service = models.ForeignKey(HospitalService, on_delete=models.SET_NULL, null=True, blank=True)
#     treatment = models.ForeignKey(HospitalTreatment, on_delete=models.SET_NULL, null=True, blank=True)
#     doctor = models.ForeignKey(HospitalDoctor, on_delete=models.SET_NULL, null=True, blank=True)
#     amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
#     type = models.CharField(max_length=20, choices=BILLING_ITEM_TYPES)
#     description = models.TextField(blank=True, null=True)

#     def save(self, *args, **kwargs):
#         # Auto-fetch service, treatment, or doctor fees
#         if self.service:
#             self.amount = self.service.cost
#             self.type = 'service'
#         elif self.treatment:
#             self.amount = self.treatment.cost
#             self.type = 'treatment'
#         elif self.doctor:
#             self.amount = self.doctor.appointment_fees_in_hospital
#             self.type = 'doctor_fees'
#         super().save(*args, **kwargs)

#     def __str__(self):
#         if self.service:
#             return f"{self.service.service_name} - {self.amount}"
#         elif self.treatment:
#             return f"{self.treatment.treatment_name} - {self.amount}"
#         elif self.doctor:
#             return f"{self.doctor.doctor_name} - {self.amount}"
#         else:
#             return f"Other Charge - {self.amount}"





class BillingDetails(models.Model):
    BILLING_ITEM_TYPES = [
        ('service', 'Service'),
        ('treatment', 'Treatment'),
        ('doctor_fees', 'Doctor Fees'),
        ('bed_charge', 'Bed Charge'),
        ('other', 'Other'),
    ]

    billing = models.ForeignKey(Billing, on_delete=models.CASCADE, related_name='details')
    service = models.ForeignKey(HospitalService, on_delete=models.SET_NULL, null=True, blank=True)
    treatment = models.ForeignKey(HospitalTreatment, on_delete=models.SET_NULL, null=True, blank=True)
    doctor = models.ForeignKey(HospitalDoctor, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    type = models.CharField(max_length=20, choices=BILLING_ITEM_TYPES)
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Auto-fetch service, treatment, or doctor fees
        if self.service:
            self.amount = self.service.cost
            self.type = 'service'
        elif self.treatment:
            self.amount = self.treatment.cost
            self.type = 'treatment'
        elif self.doctor:
            self.amount = self.doctor.appointment_fees_in_hospital
            self.type = 'doctor_fees'

        super().save(*args, **kwargs)
        self.billing.update_total_amount()  # Update billing amount after saving

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.billing.update_total_amount()  # Update billing amount after deletion

    def __str__(self):
        if self.service:
            return f"{self.service.service.name} - {self.amount}"
        elif self.treatment:
            return f"{self.treatment.treatment.name} - {self.amount}"
        elif self.doctor:
            return f"{self.doctor.doctor.doctor_name} - {self.amount}"
        else:
            return f"Other Charge - {self.amount}"





# class DirectPayment(models.Model):
#     PAYMENT_METHODS = [
#         ('credit_card', 'Credit Card'),
#         ('upi', 'UPI'),
#         ('cash', 'Cash'),
#         ('net_banking', 'Net Banking'),
#     ]

#     PAYMENT_STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('completed', 'Completed'),
#         ('failed', 'Failed'),
#     ]

#     billing = models.OneToOneField(Billing, on_delete=models.CASCADE, related_name='direct_payment')
#     payment_date = models.DateTimeField(auto_now_add=True)
#     payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
#     transaction_id = models.CharField(max_length=255, unique=True)
#     status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')

#     def __str__(self):
#         return f"Direct Payment for {self.billing} - {self.status}"




class DirectPayment(models.Model):
    PAYMENT_METHODS = [
        ('credit_card', 'Credit Card'),
        ('upi', 'UPI'),
        ('cash', 'Cash'),
        ('net_banking', 'Net Banking'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    billing = models.OneToOneField(Billing, on_delete=models.CASCADE, related_name='direct_payment')
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    transaction_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    status = models.CharField(max_length=10, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    # Razorpay-specific fields
    razorpay_order_id = models.CharField(max_length=255, blank=True, null=True)  # Order ID generated by Razorpay
    razorpay_payment_id = models.CharField(max_length=255, blank=True, null=True)  # Payment ID generated by Razorpay
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)  # Signature for verification

    def __str__(self):
        return f"Direct Payment for {self.billing} - {self.status}"


class EMI(models.Model):
    EMI_STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    billing = models.ForeignKey(Billing, on_delete=models.CASCADE, related_name='emis')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    number_of_installments = models.PositiveIntegerField()
    amount_per_installment = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()
    status = models.CharField(max_length=10, choices=EMI_STATUS_CHOICES, default='active')
    description = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        # Calculate amount per installment automatically
        if self.number_of_installments > 0:
            self.amount_per_installment = self.total_amount / self.number_of_installments
        super().save(*args, **kwargs)

    def __str__(self):
        return f"EMI for {self.billing} - {self.total_amount}"


# class EMIInstallment(models.Model):
#     emi = models.ForeignKey(EMI, on_delete=models.CASCADE, related_name='installments')
#     installment_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
#     due_date = models.DateTimeField()
#     paid_date = models.DateTimeField(null=True, blank=True)
#     status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('paid', 'Paid')], default='pending')

#     def __str__(self):
#         return f"Installment for {self.emi} - {self.installment_amount}"




class EMIInstallment(models.Model):
    emi = models.ForeignKey(EMI, on_delete=models.CASCADE, related_name='installments')
    installment_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    due_date = models.DateTimeField()
    paid_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=[('pending', 'Pending'), ('paid', 'Paid')], default='pending')
    
    # Razorpay-specific fields
    razorpay_payment_id = models.CharField(max_length=255, blank=True, null=True)  # Payment ID generated by Razorpay
    razorpay_signature = models.CharField(max_length=255, blank=True, null=True)  # Signature for verification

    def __str__(self):
        return f"Installment for {self.emi} - {self.installment_amount}"