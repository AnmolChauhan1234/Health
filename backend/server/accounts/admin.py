from django.contrib import admin
from .models import User, Hospital, Patient

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'full_name', 'role', 'phone_number', 'is_active', 'joined_at')  # Add 'joined_at' here
    list_filter = ('role', 'is_active')
    search_fields = ('email', 'full_name', 'phone_number')

admin.site.register(User, UserAdmin)

# Register the Hospital model
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'license_number')
    search_fields = ('user__full_name', 'user__email', 'location')

admin.site.register(Hospital, HospitalAdmin)

# Register the Patient model
class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'gender', 'blood_group', 'emergency_contact')
    search_fields = ('user__full_name', 'user__email', 'blood_group')

admin.site.register(Patient, PatientAdmin)
