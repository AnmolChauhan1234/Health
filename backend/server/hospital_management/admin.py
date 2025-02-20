from django.contrib import admin
from .models import Doctor, Service, Treatment, HospitalDoctor, HospitalService, HospitalTreatment

# Register models in Django Admin
# admin.site.register(Doctor)
# admin.site.register(Service)
# admin.site.register(Treatment)
# admin.site.register(HospitalDoctor)
# admin.site.register(HospitalService)
# admin.site.register(HospitalTreatment)







from django.contrib import admin
from .models import Doctor, HospitalDoctor, Service, HospitalService, Treatment, HospitalTreatment

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'doctor_name', 'specialization', 'education', 'appointment_fees', 'experience', 'availability')

@admin.register(HospitalDoctor)
class HospitalDoctorAdmin(admin.ModelAdmin):
    list_display = ('id', 'hospital', 'doctor', 'appointment_fees_in_hospital', 'specialization_in_hospital', 'consultation_days', 'availability_in_hospital', 'added_on')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'type', 'available_24x7')

@admin.register(HospitalService)
class HospitalServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'hospital', 'service', 'available_slots', 'cost')

@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'type')

@admin.register(HospitalTreatment)
class HospitalTreatmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'hospital', 'treatment', 'cost', 'doctor_required')
