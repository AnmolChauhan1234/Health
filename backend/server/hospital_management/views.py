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
from .models import Doctor, HospitalDoctor, Service, HospitalService, Treatment, HospitalTreatment

# Create your views here.


# view doctor in our hospital
# search doctor using real time search
# add doctor
# delete doctor aready exists
# edit doctor aready exists



# view
class ShowDoctorInHospitalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        hospital = get_object_or_404(Hospital, user=user)
        doctors = HospitalDoctor.objects.filter(hospital=hospital)

        results = [
            {
                "nonUpdatable": {
                    "id": doctor.doctor.id,
                    "doctor_name": doctor.doctor.doctor_name,
                    "doctor_image": doctor.doctor.doctor_image if doctor.doctor.doctor_image else None,
                    "education": doctor.doctor.education,
                    "experience": doctor.doctor.experience,
                    "availability": doctor.doctor.availability,
                    "added_on": doctor.added_on,
                },
                "updatable": {
                    "appointment_fees_in_hospital": doctor.appointment_fees_in_hospital,
                    "specialization_in_hospital": doctor.specialization_in_hospital,
                    "consultation_days": doctor.consultation_days,
                    "availability_in_hospital": doctor.availability_in_hospital,
                } 
            }
            for doctor in doctors  # Iterate correctly
        ]

        return Response({
            "doctorDetails": results
            },
            status=201
        )




# view
class ShowServiceInHospitalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        hospital = get_object_or_404(Hospital, user=user)
        services = HospitalService.objects.filter(hospital=hospital)

        results = [
            {
                "nonUpdatable": {
                    "id": service.service.id,
                    "name": service.service.name,
                    "description": service.service.description,
                    "type": service.service.type,
                    "available_24x7": service.service.available_24x7,
                },
                "updatable": {
                    "available_slots": service.available_slots,
                    "cost": service.cost,
                }
            }
            for service in services  # Iterate correctly
        ]

        return Response({
            "serviceDetails": results
            },
            status=201
        )


# view
class ShowTreatmentInHospitalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        hospital = get_object_or_404(Hospital, user=user)
        treatments = HospitalTreatment.objects.filter(hospital=hospital)

        results = [
            {
                "nonUpdatable": {
                    "id": treatment.treatment.id,
                    "name": treatment.treatment.name,
                    "description": treatment.treatment.description,
                    "type": treatment.treatment.type,
                },
                "updatable": {
                    "doctor_required": treatment.doctor_required,
                    "cost": treatment.cost,
                }
            }
            for treatment in treatments  # Iterate correctly
        ]

        return Response({
            "treatmentDetails": results
            },
            status=201
        )




# add
class AddDoctorView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user  # Get the logged-in user
        doctor_id = request.data.get('id')  # Get doctor ID from request

        # Ensure the user is linked to a hospital
        hospital = get_object_or_404(Hospital, user=user)

        # Ensure the doctor exists
        doctor = get_object_or_404(Doctor, id=doctor_id)

        # Fetch appointment fees from the Doctor model if not provided
        appointment_fees = request.data.get("appointment_fees_in_hospital", doctor.appointment_fees)

        if appointment_fees is None:  # Ensure it's not null
            return Response({"error": "Appointment fees must be provided or set in the Doctor model."}, status=400)

        # Check if the doctor is already linked to this hospital
        hospital_doctor, created = HospitalDoctor.objects.get_or_create(
            hospital=hospital,
            doctor=doctor,
            appointment_fees_in_hospital=appointment_fees
        )

        if created:
            message = "Doctor added successfully."
        else:
            message = "Doctor already exists in the hospital."

        # Return doctor details along with the message
        doctor_data = {
            "id": doctor.id,
            "name": doctor.doctor_name,
            "specialization": doctor.specialization,
            "experience": doctor.experience,
        }

        return Response({"message": message, "doctor": doctor_data}, status=201)

# add   
class AddServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        service_id = request.data.get('id')

        # Ensure the user is linked to a hospital
        hospital = get_object_or_404(Hospital, user=user)

        # Ensure the service exists
        service = get_object_or_404(Service, id=service_id)

        # Check if the service is already linked to this hospital
        hospital_service, created = HospitalService.objects.get_or_create(
            hospital=hospital,
            service=service
        )

        if created:
            message = "Service added successfully."
        else:
            message = "Service already exists in the hospital."

        # Return service details along with the message
        service_data = {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "type": service.get_type_display(),
            "available_24x7": service.available_24x7,
            "available_slots": hospital_service.available_slots,
            "cost": hospital_service.cost
        }

        return Response({"message": message, "service": service_data}, status=201)

# Yes! treatment.get_type_display() is used to get the human-readable version of the type field, which is stored as a choice in the Treatment model.
# How It Works
# Your Treatment model defines TREATMENT_TYPES as a list of tuples:
# The first value (e.g., 'cardiology') is stored in the database.
# The second value (e.g., 'Cardiology Treatments') is the human-readable format.


# add   
class AddTreatmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        treatment_id = request.data.get('id')

        # Ensure the user is linked to a hospital
        hospital = get_object_or_404(Hospital, user=user)

        # Ensure the treatment exists
        treatment = get_object_or_404(Treatment, id=treatment_id)

        # Check if the treatment is already linked to this hospital
        hospital_treatment, created = HospitalTreatment.objects.get_or_create(
            hospital=hospital,
            treatment=treatment
        )

        if created:
            message = "Treatment added successfully."
        else:
            message = "Treatment already exists in the hospital."

        # Return treatment details along with the message
        treatment_data = {
            "id": treatment.id,
            "name": treatment.name,
            "description": treatment.description,
            "type": treatment.get_type_display(),
            "cost": hospital_treatment.cost,
            "doctor_required": hospital_treatment.doctor_required
        }

        return Response({"message": message, "treatment": treatment_data}, status=201)


# delete
class DeleteDoctorView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        doctor_id = request.data.get('id')

        hospital = get_object_or_404(Hospital, user=user)
        doctor = get_object_or_404(Doctor, id=doctor_id)
        hospital_doctor = get_object_or_404(HospitalDoctor, doctor=doctor, hospital=hospital)
        hospital_doctor.delete()

        return Response({"message": "doctor deleted successfully"}, status=200)
    
# delete
class DeleteServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user  
        service_id = request.data.get('id')  

        hospital = get_object_or_404(Hospital, user=user)
        service = get_object_or_404(Service, id=service_id)

        hospital_service = get_object_or_404(HospitalService, service=service, hospital=hospital)
        hospital_service.delete()

        return Response({"message": "Service deleted successfully"}, status=200)



# delete
class DeleteTreatmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user  
        treatment_id = request.data.get('id')  

        hospital = get_object_or_404(Hospital, user=user)
        treatment = get_object_or_404(Treatment, id=treatment_id)

        hospital_treatment = get_object_or_404(HospitalTreatment, treatment=treatment, hospital=hospital)
        hospital_treatment.delete()

        return Response({"message": "Treatment deleted successfully"}, status=200)



# edit
# {
#     "facility_type": "facility_type",
#     "facility_type_id": "facility_type_id",
#     "data to change": "data"
# }





class EditHospitalManagement(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        facility_type = request.data.get('type')  # "Doctor", "Service", or "Treatment"
        facility_type_id = request.data.get('type_id')
        update_data = request.data.get('update_data', {})

        # Validation: Prevent negative appointment fees and cost
        if 'appointment_fees_in_hospital' in update_data and float(update_data['appointment_fees_in_hospital']) < 0.00:
            return Response({"error": "Appointment fee cannot be negative"}, status=400)

        if 'cost' in update_data and float(update_data['cost']) < 0.00:
            return Response({"error": "Cost cannot be negative"}, status=400)

        hospital = get_object_or_404(Hospital, user=user)

        # Handling Doctors
        if facility_type == 'doctor':
            doctor = get_object_or_404(Doctor, id=facility_type_id)
            hospital_doctor = get_object_or_404(HospitalDoctor, hospital=hospital, doctor=doctor)

            for field, value in update_data.items():
                setattr(hospital_doctor, field, value)  # Dynamically update fields

            hospital_doctor.save()
            return Response({"message": "Doctor details updated successfully"}, status=200)

        # Handling Services
        elif facility_type == 'service':
            service = get_object_or_404(Service, id=facility_type_id)
            hospital_service = get_object_or_404(HospitalService, hospital=hospital, service=service)


            for field, value in update_data.items():
                setattr(hospital_service, field, value)

            hospital_service.save()
            return Response({"message": "Service details updated successfully"}, status=200)

        # Handling Treatments
        elif facility_type == 'treatment':
            treatment = get_object_or_404(Treatment, id=facility_type_id)
            hospital_treatment = get_object_or_404(HospitalTreatment, hospital=hospital, treatment=treatment)


            for field, value in update_data.items():
                setattr(hospital_treatment, field, value)

            hospital_treatment.save()
            return Response({"message": "Treatment details updated successfully"}, status=200)

        else:
            return Response({"error": "Invalid facility type"}, status=400)



class SearchDoctorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get query parameter and remove leading/trailing spaces
        query = request.query_params.get("q", "").strip()  # `strip()` ensures no extra spaces affect the search
        
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        # Use `icontains` to perform a case-insensitive search for doctors whose name contains the query
        doctors = Doctor.objects.filter(doctor_name__icontains=query)
        # `icontains` ensures that any part of the name matches the query, even in the middle

        if not doctors.exists():  # If no doctor matches the query
            return Response({"message": "No doctors found"}, status=404)

        # Convert queryset into a list of dictionaries
        results = [{"id": doctor.id, "name": doctor.doctor_name} for doctor in doctors]
        
        return Response({"doctors": results})
    



class SearchServiceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q').strip()

        if not query:
            return Response({})
        
        services = Service.objects.filter(name__icontains=query)
        results = [{"serviceId": service.id, "serviceName": service.name} for service in services]

        return Response({"services": results})
    


class SearchTreatmentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.query_params.get('q').strip()

        if not query:
            return Response({})
        
        treatments = Treatment.objects.filter(name__icontains=query)
        results = [{"treatmentId": treatment.id, "treatmentName": treatment.name} for treatment in treatments]

        return Response({"treatments": results})
