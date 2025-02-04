from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Hospital, Patient
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone_number', 'password', 'role']

    def create(self, validated_data):
        role = validated_data.pop('role', None)
        password = validated_data.pop('password')

        # Create User without password first
        user = User(**validated_data)
        user.set_password(password)  # Proper way to hash password
        user.role = role
        user.save()

        # Create Role-Specific Model
        if role == 'patient':
            Patient.objects.create(user=user)
        elif role == 'hospital':
            Hospital.objects.create(user=user)

        return user



class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()  # Assuming login via email
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])  # Use email instead of username
        
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        
        if not user.is_active:
            raise serializers.ValidationError("User account is not active.")
        
        return user
