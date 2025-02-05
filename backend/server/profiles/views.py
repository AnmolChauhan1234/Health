from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from accounts.models import User, Patient, Hospital
from .serializers import UserUpdateSerializer, PatientUpdateSerializer, HospitalUpdateSerializer

class UpdateProfileView(APIView):
    # ✅ Ensures only authenticated users can update their profiles
    permission_classes = [IsAuthenticated]  

    # ✅ Allows handling file uploads (profile pictures) along with form data
    # parser_classes = (MultiPartParser, FormParser)  

    def patch(self, request):
        user = request.user  # ✅ Get the currently authenticated user
        data = request.data.copy()  # ✅ Create a mutable copy of request data

        # ✅ Update common fields (e.g., full_name, phone_number, profile_picture)
        user_serializer = UserUpdateSerializer(user, data=data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()  # ✅ Save updates to the user model

        # ✅ If the user is a patient, update patient-specific fields
        if user.role == 'patient':
            patient = get_object_or_404(Patient, user=user)  # ✅ Get the patient's profile
            patient_serializer = PatientUpdateSerializer(patient, data=data, partial=True)
            if patient_serializer.is_valid():
                patient_serializer.save()  # ✅ Save patient profile updates
            return Response({"user": user_serializer.data, "patient": patient_serializer.data})

        # ✅ If the user is a hospital, update hospital-specific fields
        elif user.role == 'hospital':
            hospital = get_object_or_404(Hospital, user=user)  # ✅ Get the hospital's profile
            hospital_serializer = HospitalUpdateSerializer(hospital, data=data, partial=True)
            if hospital_serializer.is_valid():
                hospital_serializer.save()  # ✅ Save hospital profile updates
            return Response({"user": user_serializer.data, "hospital": hospital_serializer.data})

        # ✅ If no specific role is found, return only user data
        return Response({"user": user_serializer.data})
    