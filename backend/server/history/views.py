from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import BillHistory
from accounts.models import Patient, Hospital
from rest_framework import status
from payments.models import BillingDetails

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from history.models import BillHistory


from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import BillHistory
from payments.models import Billing
from rest_framework import status


class BillHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user  # Get the authenticated user

        try:
            if hasattr(user, 'patient'):
                history = BillHistory.objects.filter(patient=user.patient).order_by('-updated_at')
            elif hasattr(user, 'hospital'):
                history = BillHistory.objects.filter(hospital=user.hospital).order_by('-updated_at')
            else:
                return Response({'error': 'User is neither a patient nor a hospital'}, status=status.HTTP_403_FORBIDDEN)

            # Serialize the response correctly
            data = [
                {
                    'bill_history_id': entry.id,  # Explicitly naming it as bill_history_id
                    'billing_id': entry.billing.id,  # Billing ID
                    'patient_name': entry.billing.patient.user.full_name if entry.billing.patient else "Unknown",
                    'hospital_name': entry.billing.hospital.user.full_name if entry.billing.hospital else "Unknown",
                    'total_amount': entry.total_amount,
                    'status': entry.status,
                    'updated_at': entry.updated_at.strftime('%Y-%m-%d %H:%M:%S')
                }
                for entry in history
            ]

            return Response({'history': data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class BillDetailsByBillingView(APIView):
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            billing_id = request.GET.get('id')

            billing = Billing.objects.get(id=billing_id)  # Fetch the billing record

            bill_details_entries = BillingDetails.objects.filter(billing=billing)  # Fetch all related BillHistory

            if not bill_details_entries.exists():
                return Response({'message': 'No bill details found for this billing ID'}, status=status.HTTP_404_NOT_FOUND)

            data = [
                {
                'id': detail.id,
                'billing_id': detail.billing.id,
                'patient': detail.billing.patient.user.full_name if detail.billing.patient else None,
                'hospital': detail.billing.hospital.user.full_name if detail.billing.hospital else None,
                'total_amount': detail.billing.total_amount,
                'status': detail.billing.status,
                # 'updated_at': detail.billing.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
                'type': detail.get_type_display(),
                'amount': detail.amount,
                'description': detail.description,
                'service': detail.service.service.name if detail.service else None,
                'treatment': detail.treatment.treatment.name if detail.treatment else None,
                'doctor': detail.doctor.doctor.doctor_name if detail.doctor else None,
                }
                for detail in bill_details_entries
            ]


            return Response({'billing_id': billing_id, 'history': data}, status=status.HTTP_200_OK)

        except Billing.DoesNotExist:
            return Response({'error': 'Billing record not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
