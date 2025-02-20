from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import AuthenticationFailed
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
import uuid
from rest_framework.exceptions import ValidationError
from datetime import timedelta
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from accounts.models import Hospital
from hospital_management.models import Doctor, HospitalDoctor, Service, HospitalService, Treatment, HospitalTreatment

# Create your views here.




class SearchDoctorView(APIView):
    permission_classes = [IsAuthenticated]      # Ensures only authenticated users can access

    def get(self, request):

        hospital_user = request.user
        hospital = get_object_or_404(Hospital, user=hospital_user)

        # Get query parameter and remove leading/trailing spaces
        query = request.query_params.get("q", "").strip()  # `strip()` ensures no extra spaces affect the search
        
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        # Use `icontains` to perform a case-insensitive search for doctors whose name contains the query
        doctors = HospitalDoctor.objects.filter(hospital=hospital, doctor__doctor_name__icontains=query)
        # `icontains` ensures that any part of the name matches the query, even in the middle

        if not doctors.exists():  # If no doctor matches the query
            return Response({"message": "No doctors found"}, status=404)

        # Convert queryset into a list of dictionaries
        results = [{"id": doctor.doctor.id, "name": doctor.doctor.doctor_name} for doctor in doctors]
        
        return Response({"doctors": results})
    



class SearchServiceView(APIView):
    permission_classes = [IsAuthenticated]      # Ensures only authenticated users can access

    def get(self, request):

        hospital_user = request.user
        hospital = get_object_or_404(Hospital, user=hospital_user)

        # Get query parameter and remove leading/trailing spaces
        query = request.query_params.get("q", "").strip()  # `strip()` ensures no extra spaces affect the search
        
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        # Use `icontains` to perform a case-insensitive search for doctors whose name contains the query
        services = HospitalService.objects.filter(hospital=hospital, service__name__icontains=query)
        # `icontains` ensures that any part of the name matches the query, even in the middle

        if not services.exists():  # If no doctor matches the query
            return Response({"message": "No doctors found"}, status=404)

        # Convert queryset into a list of dictionaries
        results = [{"id": service.service.id, "name": service.service.name} for service in services]
        
        return Response({"services": results})
    




class SearchTreatmentAPIView(APIView):
    permission_classes = [IsAuthenticated]      # Ensures only authenticated users can access

    def get(self, request):

        hospital_user = request.user
        hospital = get_object_or_404(Hospital, user=hospital_user)

        # Get query parameter and remove leading/trailing spaces
        query = request.query_params.get("q", "").strip()  # `strip()` ensures no extra spaces affect the search
        
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        # Use `icontains` to perform a case-insensitive search for doctors whose name contains the query
        treatments = HospitalTreatment.objects.filter(hospital=hospital, treatment__name__icontains=query)
        # `icontains` ensures that any part of the name matches the query, even in the middle

        if not treatments.exists():  # If no doctor matches the query
            return Response({"message": "No doctors found"}, status=404)

        # Convert queryset into a list of dictionaries
        results = [{"id": treatment.treatment.id, "name": treatment.treatment.name} for treatment in treatments]
        
        return Response({"treatments": results})
    





