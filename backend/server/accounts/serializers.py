from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Hospital, Patient
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['username', 'full_name', 'email', 'phone_number', 'password', 'role', 'profile_picture']
    
    def create(self, validated_data):
        role = validated_data.pop('role', None)
        password = validated_data.pop('password')
        
        # Create User
        user = User.objects.create(
            **validated_data,
            password=make_password(password),  # Hash password before saving
            role=role
        )
        
        # Create Role-Specific Model
        if role == 'patient':
            Patient.objects.create(user=user)
        elif role == 'hospital':
            Hospital.objects.create(user=user)
        
        # Generate JWT Tokens
        refresh = RefreshToken.for_user(user)
        user.refresh_token = str(refresh)
        user.save()
        
        return user
