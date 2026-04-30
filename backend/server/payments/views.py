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
from django.utils import timezone
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from accounts.models import Hospital
from hospital_management.models import Doctor, HospitalDoctor, Service, HospitalService, Treatment, HospitalTreatment
from accounts.models import User, Patient
from .models import Billing, BillingDetails, DirectPayment, EMI, EMIInstallment
from datetime import timedelta, date
from history.models import BillHistory

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
        # hospital_user = request.user

        # hospital = get_object_or_404(Hospital, user=hospital_user)

        query = request.query_params.get("q", "").strip()


        if not query:
            return Response({"error": "Query parameter is required"}, status=400)
        
        patients = Patient.objects.filter(user__full_name__icontains = query)

        if not patients.exists():
            return Response({"message": "No patient found"}, status=404)
        

        results = [{"id": patient.id, "name": patient.user.full_name} for patient in patients]

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
        

        # Add the bill to history
        BillHistory.objects.create(
            patient=patient,
            hospital=hospital,
            billing=bill,
            total_amount=bill.total_amount,  # Initially 0
            status=bill.status
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




# Razorpay Payment Views
import razorpay
import json
import hashlib
import hmac
from django.conf import settings


class CreateRazorpayOrder(APIView):
    """
    Create a Razorpay order for full payment.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Create a Razorpay order for full bill payment.
        
        Expected payload:
        {
            "billing_id": 123
        }
        """
        try:
            billing_id = request.data.get('billing_id')
            
            if not billing_id:
                return Response(
                    {"error": "Billing ID is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get the billing object
            billing = get_object_or_404(Billing, id=billing_id)
            
            # Check that the user owns this bill (patient)
            if billing.patient and billing.patient.user != request.user:
                return Response(
                    {"error": "You don't have permission to pay this bill"},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Get the total amount (convert to paisa - Razorpay expects amount in paisa)
            amount = int(billing.total_amount * 100)

            if amount <= 0:
                print(f"CreateRazorpayOrder Error: Invalid amount (billing_id={billing_id}, amount={amount})")
                return Response(
                    {"error": "Invalid amount"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Initialize Razorpay client
            razorpay_client = razorpay.Client(
                auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
            )

            # Create order
            order = razorpay_client.order.create({
                "amount": amount,
                "currency": "INR",
                "receipt": f"bill_{billing_id}",
                "notes": {
                    "billing_id": str(billing_id),
                    "patient_name": billing.patient.user.full_name if billing.patient else ""
                }
            })

            # Create or update DirectPayment record
            direct_payment, created = DirectPayment.objects.update_or_create(
                billing=billing,
                defaults={
                    "payment_method": "razorpay",
                    "razorpay_order_id": order.get("id"),
                    "status": "pending"
                }
            )

            return Response({
                "order_id": order.get("id"),
                "amount": amount,
                "currency": "INR",
                "billing_id": billing_id,
                "key_id": settings.RAZORPAY_KEY_ID
            }, status=status.HTTP_200_OK)

        except razorpay.errors.BadRequestError as e:
            print(f"CreateRazorpayOrder BadRequestError: {str(e)}")
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"CreateRazorpayOrder Exception: {str(e)}")
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VerifyPayment(APIView):
    """
    Verify Razorpay payment and update bill status.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Verify Razorpay payment.
        
        Expected payload:
        {
            "billing_id": 123,
            "razorpay_payment_id": "pay_XXX",
            "razorpay_order_id": "order_XXX",
            "razorpay_signature": "signature"
        }
        """
        try:
            billing_id = request.data.get('billing_id')
            razorpay_payment_id = request.data.get('razorpay_payment_id')
            razorpay_order_id = request.data.get('razorpay_order_id')
            razorpay_signature = request.data.get('razorpay_signature')

            # Validate required fields
            if not all([billing_id, razorpay_payment_id, razorpay_order_id, razorpay_signature]):
                return Response(
                    {"error": "All payment details are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get the billing object
            billing = get_object_or_404(Billing, id=billing_id)

            # Verify signature
            secret = settings.RAZORPAY_KEY_SECRET
            msg = f"{razorpay_order_id}|{razorpay_payment_id}"
            expected_signature = hmac.new(
                secret.encode(),
                msg.encode(),
                hashlib.sha256()
            ).hexdigest()

            if razorpay_signature != expected_signature:
                return Response(
                    {"error": "Invalid signature"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Update DirectPayment record
            direct_payment = get_object_or_404(DirectPayment, billing=billing)
            direct_payment.razorpay_payment_id = razorpay_payment_id
            direct_payment.razorpay_signature = razorpay_signature
            direct_payment.status = "completed"
            direct_payment.save()

            # Update billing status
            billing.status = "paid"
            billing.save()

            # Update BillHistory
            BillHistory.objects.update_or_create(
                billing=billing,
                defaults={
                    "total_amount": billing.total_amount,
                    "status": "paid"
                }
            )

            return Response({
                "message": "Payment verified successfully",
                "billing_id": billing_id,
                "status": "paid"
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CreateEMIOrder(APIView):
    """
    Create a Razorpay order for EMI payment.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Create a Razorpay order for EMI payment.
        
        Expected payload:
        {
            "billing_id": 123,
            "installments": 3
        }
        """
        try:
            billing_id = request.data.get('billing_id')
            number_of_installments = request.data.get('installments', 3)

            if not billing_id:
                return Response(
                    {"error": "Billing ID is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get the billing object
            billing = get_object_or_404(Billing, id=billing_id)

            # Check that the user owns this bill (patient)
            if billing.patient and billing.patient.user != request.user:
                return Response(
                    {"error": "You don't have permission to pay this bill"},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Get the total amount
            total_amount = billing.total_amount

            if total_amount <= 0:
                return Response(
                    {"error": "Invalid amount"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Calculate amount per installment
            amount_per_installment = total_amount / number_of_installments
            amount_in_paisa = int(amount_per_installment * 100)

            if amount_in_paisa <= 0:
                return Response(
                    {"error": "Invalid installment amount"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Initialize Razorpay client
            razorpay_client = razorpay.Client(
                auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
            )

            # Create order for first installment
            order = razorpay_client.order.create({
                "amount": amount_in_paisa,
                "currency": "INR",
                "receipt": f"emi_{billing_id}_1",
                "notes": {
                    "billing_id": str(billing_id),
                    "installment": "1",
                    "total_installments": str(number_of_installments)
                }
            })

            # Create EMI record
            emi, created = EMI.objects.update_or_create(
                billing=billing,
                defaults={
                    "total_amount": total_amount,
                    "number_of_installments": number_of_installments,
                    "amount_per_installment": amount_per_installment,
                    "end_date": timezone.now() + timedelta(days=30 * number_of_installments),
                    "status": "active"
                }
            )

            return Response({
                "order_id": order.get("id"),
                "amount": amount_in_paisa,
                "currency": "INR",
                "billing_id": billing_id,
                "installment_number": 1,
                "total_installments": number_of_installments,
                "amount_per_installment": float(amount_per_installment),
                "key_id": settings.RAZORPAY_KEY_ID
            }, status=status.HTTP_200_OK)

        except razorpay.errors.BadRequestError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VerifyEMIPayment(APIView):
    """
    Verify Razorpay EMI payment and create installment record.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Verify Razorpay EMI payment.
        
        Expected payload:
        {
            "billing_id": 123,
            "razorpay_payment_id": "pay_XXX",
            "razorpay_order_id": "order_XXX",
            "razorpay_signature": "signature",
            "installment_number": 1
        }
        """
        try:
            billing_id = request.data.get('billing_id')
            razorpay_payment_id = request.data.get('razorpay_payment_id')
            razorpay_order_id = request.data.get('razorpay_order_id')
            razorpay_signature = request.data.get('razorpay_signature')
            installment_number = request.data.get('installment_number', 1)

            # Validate required fields
            if not all([billing_id, razorpay_payment_id, razorpay_order_id, razorpay_signature]):
                return Response(
                    {"error": "All payment details are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Get the billing and EMI objects
            billing = get_object_or_404(Billing, id=billing_id)
            emi = get_object_or_404(EMI, billing=billing)

            # Verify signature
            secret = settings.RAZORPAY_KEY_SECRET
            msg = f"{razorpay_order_id}|{razorpay_payment_id}"
            expected_signature = hmac.new(
                secret.encode(),
                msg.encode(),
                hashlib.sha256()
            ).hexdigest()

            if razorpay_signature != expected_signature:
                return Response(
                    {"error": "Invalid signature"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create EMI installment record
            from datetime import timedelta
            due_date = timezone.now() + timedelta(days=30)
            
            installment = EMIInstallment.objects.create(
                emi=emi,
                installment_amount=emi.amount_per_installment,
                due_date=due_date,
                paid_date=timezone.now(),
                status="paid",
                razorpay_payment_id=razorpay_payment_id,
                razorpay_signature=razorpay_signature
            )

            # Check if all installments are paid
            paid_installments = emi.installments.filter(status="paid").count()
            
            if paid_installments >= emi.number_of_installments:
                emi.status = "completed"
                emi.save()
                
                # Update billing status to paid
                billing.status = "paid"
                billing.save()

                # Update BillHistory
                BillHistory.objects.update_or_create(
                    billing=billing,
                    defaults={
                        "total_amount": billing.total_amount,
                        "status": "paid"
                    }
                )

            return Response({
                "message": "EMI payment verified successfully",
                "billing_id": billing_id,
                "installment_number": installment_number,
                "paid_installments": paid_installments,
                "total_installments": emi.number_of_installments,
                "status": "paid" if paid_installments >= emi.number_of_installments else "active"
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
