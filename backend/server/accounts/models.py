from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    # Remove username field completely
    username = None  

    # Use email as the unique identifier for authentication
    email = models.EmailField(unique=True)

    # Role choices for patient or hospital
    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('hospital', 'Hospital'),
    ]
    
    # Custom fields
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    full_name = models.CharField(max_length=100, null=False)
    phone_number = models.CharField(max_length=15, unique=True, null=False)
    profile_picture = models.CharField(max_length=255, blank=True, null=True)  # Storing Cloudinary URL
    refresh_token = models.TextField(blank=True, null=True)  # Stores JWT Refresh Token
    joined_at = models.DateTimeField(auto_now_add=True)  # Timestamp when user registers


    # Set email as the USERNAME_FIELD (authentication field)
    USERNAME_FIELD = 'email'
    
    # Fields required for creating a superuser
    REQUIRED_FIELDS = ['full_name', 'phone_number']

    def __str__(self):
        return f"{self.email} ({self.role})"



# 2️⃣ Hospital Model
class Hospital(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255, blank=True, null=True)  # Optional field
    license_number = models.CharField(max_length=50, unique=True, blank=True, null=True)  # Optional
    established_year = models.PositiveIntegerField(blank=True, null=True)  # Optional
    bed_capacity = models.PositiveIntegerField(default=0, blank=True, null=True)  # Optional
    emergency_services = models.BooleanField(default=False)  # Optional (default is False)

    def __str__(self):
        return self.user.full_name  # Uses full name from User model


# 3️⃣ Patient Model
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.PositiveIntegerField(blank=True, null=True)  # Optional field
    gender = models.CharField(
        max_length=10, 
        choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')],
        blank=True, 
        null=True
    )  # Optional
    blood_group = models.CharField(max_length=5, blank=True, null=True)  # Optional
    address = models.TextField(blank=True, null=True)  # Optional
    emergency_contact = models.CharField(max_length=15, blank=True, null=True)  # Optional
    medical_history = models.TextField(blank=True, null=True)  # Optional

    def __str__(self):
        return self.user.full_name