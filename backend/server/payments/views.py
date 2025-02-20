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
from accounts.models import User, Patient
from .models import Billing, BillingDetails
from datetime import timedelta, date

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
    



class SearchUserAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        hospital_user = request.user

        hospital = get_object_or_404(Hospital, user=hospital_user)

        query = request.query_params.get("q", "").strip()


        if not query:
            return Response({"error": "Query parameter is required"}, status=400)
        
        users = User.objects.filter(name__icontains = query)

        if not users.exists():
            return Response({"message": "No doctors found"}, status=404)
        

        results = [{"id": user.id, "name": user.name} for user in users]

        return Response({"users": results})




class CreateBill(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        patient_id = request.data.get('id')
        hospital_user = request.user

        # Ensure the patient exists
        patient = get_object_or_404(Patient, id=patient_id)

        hospital = get_object_or_404(Hospital, user=hospital_user)

        # Create the billing record
        bill = Billing.objects.create(
            patient=patient, 
            hospital=hospital,
            status="pending",
            due_date=date.today() + timedelta(days=7)
        )

        return Response({"message": "Bill created successfully", "bill_id": bill.id}, status=status.HTTP_201_CREATED)




class AddBillDetails(APIView):

    permission_classes = [IsAuthenticated]
    def post(self, request):
        hospital_user = request.user
        billing_id = request.data.get('id')
        facility_id = request.data.get('facility_id')
        facility_type = request.data.get('facility_type')


        billing = get_object_or_404(Billing, id=billing_id)
        hospital = get_object_or_404(Hospital, user=hospital_user)


        if facility_type == "doctor":
            doctor = get_object_or_404(Doctor, id=facility_id)
            hospital_doctor = get_object_or_404(HospitalDoctor, hospital=hospital, doctor=doctor)

            bill_details = BillingDetails.objects.create(
                billing=billing,
                doctor=hospital_doctor,
                amount = hospital_doctor.appointment_fees_in_hospital,
                type = "doctor"
            )



        elif facility_type == "service":
            service = get_object_or_404(Service, id=facility_id)
            hospital_service = get_object_or_404(HospitalService, hospital=hospital, service=service)

            bill_details = BillingDetails.objects.create(
                billing=billing,
                service=hospital_service,
                amount = hospital_service.cost,
                type = "service"
                )
            



        elif facility_type == "treatment":
            treatment = get_object_or_404(Treatment, id=facility_id)
            hospital_treatment = get_object_or_404(HospitalTreatment, hospital=hospital, treatment=treatment)

            bill_details = BillingDetails.objects.create(
                billing=billing,
                treatment=hospital_treatment,
                amount = hospital_treatment.cost,
                type = "treatment"
                )
            
        
        else:
            return Response({"error": "Invalid facility type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Bill details added successfully", "bill_detail_id": bill_details.id}, status=status.HTTP_201_CREATED)





class DeleteBillDetails(APIView):

    permission_classes = [IsAuthenticated]
    def delete(self, request):
        bill_details_id = request.data.get('id')


        bill_details = get_object_or_404(BillingDetails, id=bill_details_id)
        bill_details.delete()
        

        return Response({"message": "Bill details deleted successfully"}, status=status.HTTP_200_OK)
