from django.contrib import admin
from .models import Doctor, Service, Treatment, HospitalDoctor, HospitalService, HospitalTreatment

# Register models in Django Admin
admin.site.register(Doctor)
admin.site.register(Service)
admin.site.register(Treatment)
admin.site.register(HospitalDoctor)
admin.site.register(HospitalService)
admin.site.register(HospitalTreatment)
