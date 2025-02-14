from django.contrib import admin
from .models import Billing, BillingDetails, DirectPayment, EMI, EMIInstallment

@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'hospital', 'total_amount', 'billing_date', 'due_date', 'status')
    list_filter = ('status', 'billing_date', 'due_date')
    search_fields = ('patient__user__full_name', 'hospital__name')

@admin.register(BillingDetails)
class BillingDetailsAdmin(admin.ModelAdmin):
    list_display = ('id', 'billing', 'service', 'treatment', 'doctor', 'amount', 'type')
    list_filter = ('type',)
    search_fields = ('billing__id', 'service__service_name', 'treatment__treatment_name', 'doctor__doctor_name')

@admin.register(DirectPayment)
class DirectPaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'billing', 'payment_date', 'payment_method', 'transaction_id', 'status', 'razorpay_order_id')
    list_filter = ('payment_method', 'status')
    search_fields = ('billing__id', 'transaction_id', 'razorpay_order_id', 'razorpay_payment_id')

@admin.register(EMI)
class EMIAdmin(admin.ModelAdmin):
    list_display = ('id', 'billing', 'total_amount', 'number_of_installments', 'amount_per_installment', 'start_date', 'end_date', 'status')
    list_filter = ('status',)
    search_fields = ('billing__id',)

@admin.register(EMIInstallment)
class EMIInstallmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'emi', 'installment_amount', 'due_date', 'paid_date', 'status', 'razorpay_payment_id')
    list_filter = ('status',)
    search_fields = ('emi__id', 'razorpay_payment_id')

