from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from accounts.models import User, Patient, Hospital
from .serializers import UserUpdateSerializer, PatientUpdateSerializer, HospitalUpdateSerializer, PasswordResetSerializer
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.permissions import AllowAny


#     phone_number = models.CharField(max_length=15, unique=True, null=False)
#     profile_picture = models.CharField(max_length=255, blank=True, null=True)  # Storing Cloudinary URL
#     refresh_token = models.TextField(blank=True, null=True)  # Stores JWT Refresh Token
#     joined_at = models.DateTimeField(auto_now_add=True)  # Timestamp when user registers
#     reset_token = models.UUIDField(default=uuid.uuid4, null=True, blank=True)
#     otp = models.CharField(max_length=6, null=True, blank=True)
#     otp_created_at = models.DateTimeField(null=True, blank=True)


# # 2️⃣ Hospital Model
# class Hospital(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     location = models.CharField(max_length=255, blank=True, null=True)  # Optional field
#     license_number = models.CharField(max_length=50, unique=True, blank=True, null=True)  # Optional
#     established_year = models.PositiveIntegerField(blank=True, null=True)  # Optional
#     bed_capacity = models.PositiveIntegerField(default=0, blank=True, null=True)  # Optional
#     emergency_services = models.BooleanField(default=False)  # Optional (default is False)

#     def __str__(self):
#         return self.user.full_name  # Uses full name from User model


# # 3️⃣ Patient Model
# class Patient(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     age = models.PositiveIntegerField(blank=True, null=True)  # Optional field
#     gender = models.CharField(
#         max_length=10, 
#         choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')],
#         blank=True, 
#         null=True
#     )  # Optional
#     blood_group = models.CharField(max_length=5, blank=True, null=True)  # Optional
#     address = models.TextField(blank=True, null=True)  # Optional
#     emergency_contact = models.CharField(max_length=15, blank=True, null=True)  # Optional
#     medical_history = models.TextField(blank=True, null=True)  # Optional

class ViewProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        profile = {
            "role": user.role,
            "name": user.full_name,
            "email": user.email,
            "phoneNumber": user.phone_number,
            "joinedAt": user.joined_at,
            "profilePicture": user.profile_picture,
        }

        if user.role == "patient":
            patient = get_object_or_404(Patient, user=user)
            profile_role = {
                "age": patient.age,
                "gender": patient.gender,
                "bloodGroup": patient.blood_group,
                "address": patient.address,
                "emergencyContact": patient.emergency_contact,
                "medicalHistory": patient.medical_history
            }

        elif user.role == "hospital":
            hospital = get_object_or_404(Hospital, user=user)
            profile_role = {
                "hospitalAddress": hospital.hospital_address,
                "licenseNumber": hospital.license_number,
                "establishedYear": hospital.established_year,
                "bedCapacity": hospital.bed_capacity,
                "emergencyServices": hospital.emergency_services,
                # "geoSpatialLocation": hospital.location
            }

        return Response({
            "userProfile": profile,
            "roleSpecificProfile": profile_role
        },
            status=status.HTTP_200_OK
        )

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
    

class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        serializer = PasswordResetSerializer(data=request.data)
        
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            
            if not user.check_password(old_password):
                raise AuthenticationFailed('Old password is incorrect.')

            # Set the new password
            user.set_password(new_password)
            user.save()

            return Response({
                'message': 'Password reset successfully.'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ShowProfilePictureView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile_picture = user.profile_picture or None

        return Response({"profile_picture": profile_picture}, status=status.HTTP_200_OK)