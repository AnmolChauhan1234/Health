from django.db import models
from accounts.models import User, Patient, Hospital
from django.core.validators import MinValueValidator


# Create your models here.



class Doctor(models.Model):
    doctor_name = models.CharField(max_length=255)
    doctor_image = models.CharField(max_length=255, blank=True, null=True)  # Storing Cloudinary URL
    specialization = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    appointment_fees = models.CharField()
    experience = models.IntegerField(default=0)  # Years of experience
    availability = models.BooleanField(default=True)  # Whether the doctor is available

    def __str__(self):
        return f"{self.doctor_name} ({self.specialization})"

class HospitalDoctor(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_fees_in_hospital = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    specialization_in_hospital = models.CharField(
        max_length=255,
        default="General"  # Set a default specialization
    )
    consultation_days = models.CharField(
        max_length=255, 
        default="Monday to Friday"  # Default consultation days
    )
    availability_in_hospital = models.BooleanField(default=True)  # Whether the doctor is available
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.doctor} at {self.hospital}"
    

class Service(models.Model):
    SERVICE_TYPES = [
        ('diagnostics', 'Diagnostics & Imaging'),
        ('medical_checkups', 'Medical Checkups & Screenings'),
        ('emergency', 'Emergency & Critical Care'),
        ('therapy', 'Physiotherapy & Rehabilitation'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=50, choices=SERVICE_TYPES)
    available_24x7 = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"


class HospitalService(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    available_slots = models.IntegerField(default=0)
    cost = models.DecimalField(default=100, max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return f"{self.service} at {self.hospital}"

class Treatment(models.Model):
    TREATMENT_TYPES = [
        ('cardiology', 'Cardiology Treatments'),
        ('neurology', 'Neurology Treatments'),
        ('orthopedic', 'Orthopedic Treatments'),
        ('oncology', 'Cancer Treatments'),
        ('surgery', 'General Surgery'),
        ('maternity', 'Maternity & Childbirth'),
        ('ophthalmology', 'Ophthalmology Treatments'),
        ('otolaryngology', 'Otolaryngology Treatments'),
    ]

    
    name = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=50, choices=TREATMENT_TYPES)

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"


class HospitalTreatment(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    treatment = models.ForeignKey(Treatment, on_delete=models.CASCADE)
    cost = models.DecimalField(default=100, max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    doctor_required = models.BooleanField(default=True)  # If a doctor is needed for this treatment

    def __str__(self):
        return f"{self.treatment} at {self.hospital}"