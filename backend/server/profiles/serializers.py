from rest_framework import serializers
from accounts.models import User, Patient, Hospital

# 1️⃣ User Update Serializer
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Refers to the User model
        fields = ['full_name', 'phone_number', 'profile_picture']  # Fields that can be updated
        extra_kwargs = {
            'profile_picture': {'required': False},  # Profile picture is optional
            'phone_number': {'required': False},  # Phone number is also optional
        }
        # ❗ Note: `full_name` is required unless `partial=True` is used in the view

# 2️⃣ Patient Update Serializer
class PatientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient  # Refers to the Patient model
        fields = ['age', 'gender', 'blood_group', 'address', 'emergency_contact', 'medical_history']
        extra_kwargs = {field: {'required': False} for field in fields}  
        # ✅ All fields are optional, so user can update only one field at a time

# 3️⃣ Hospital Update Serializer
class HospitalUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital  # Refers to the Hospital model
        fields = ['location', 'license_number', 'established_year', 'bed_capacity', 'emergency_services']
        extra_kwargs = {field: {'required': False} for field in fields}  
        # ✅ All fields are optional, so partial updates can be made


class PasswordResetSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        # Check if new password matches the confirmed new password
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError("New password and confirm password do not match.")
        
        return data