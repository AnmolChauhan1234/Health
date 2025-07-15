from django.shortcuts import render
# import requests
from accounts.models import Hospital
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from accounts.models import User, Patient, Hospital
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.permissions import AllowAny

# Create your views here.


from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from hospital_management.models import Doctor, HospitalDoctor, Service, HospitalService, Treatment, HospitalTreatment


# Yes, you can automate this process, so you don't have to manually update the geom field every time you update the latitude and longitude. Instead of manually updating the geom field, you can create a trigger that automatically updates the geom field whenever the latitude or longitude values change.

# Here's how you can achieve that:

# 1️⃣ Create a Trigger Function
# This trigger function will automatically update the geom column whenever the latitude or longitude is updated:

# sql
# Copy
# Edit
# CREATE OR REPLACE FUNCTION update_geom_on_lat_lng_change()
# RETURNS TRIGGER AS $$
# BEGIN
#   -- Update the geom column when latitude or longitude is changed
#   NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
#   RETURN NEW;
# END;
# $$ LANGUAGE plpgsql;
# 2️⃣ Create a Trigger for the accounts_hospital Table
# Once the function is created, you'll need to attach it to the accounts_hospital table. The trigger will fire every time a row in the table is updated.

# sql
# Copy
# Edit
# CREATE TRIGGER update_geom_trigger
# BEFORE UPDATE ON accounts_hospital
# FOR EACH ROW
# EXECUTE FUNCTION update_geom_on_lat_lng_change();
# How It Works:
# When a row is updated, if the latitude or longitude values are modified, the trigger will automatically update the geom field.
# This will eliminate the need to manually update the geom column every time you update the longitude or latitude.
# 3️⃣ Test the Trigger
# Try updating the latitude or longitude in the accounts_hospital table, and the geom column should update automatically.

# sql
# Copy
# Edit
# UPDATE accounts_hospital
# SET latitude = 28.7041, longitude = 77.1025
# WHERE id = 5;
# Then, check the geom field:

# sql
# Copy
# Edit
# SELECT id, ST_AsText(geom) FROM accounts_hospital;
# You should see the geom column automatically updated based on the new latitude and longitude values.

# 🔧 Final Thoughts:
# No manual updates needed for geom anymore.
# This approach keeps the geom field in sync with the latitude and longitude values, which simplifies database management.





# class NearbyHospitalsView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         try:
#             latitude = float(request.GET.get("lat"))
#             longitude = float(request.GET.get("lng"))
#             radius = 10000  # 10 km

#             sql_query = """
#             SELECT accounts_user.full_name, accounts_hospital.latitude, accounts_hospital.longitude, 
#                    ST_DistanceSphere(accounts_hospital.geom, ST_MakePoint(%s, %s)) AS distance
#             FROM accounts_hospital
#             JOIN accounts_user ON accounts_user.id = accounts_hospital.user_id
#             WHERE ST_DWithin(accounts_hospital.geom, ST_MakePoint(%s, %s), %s, true)
#             ORDER BY distance ASC;
#             """

#             with connection.cursor() as cursor:
#                 cursor.execute(sql_query, [longitude, latitude, longitude, latitude, radius])  
#                 results = [
#                     {"name": row[0], "latitude": row[1], "longitude": row[2], "distance": row[3]}
#                     for row in cursor.fetchall()
#                 ]

#             return Response(results, status=status.HTTP_200_OK)

#         except (TypeError, ValueError):
#             return Response({"error": "Invalid location parameters"}, status=status.HTTP_400_BAD_REQUEST)





from django.db import connection
from django.db.models import Min
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from accounts.models import Hospital

class NearbyHospitalsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        print("API hit")  # Debugging statement
        try:
            latitude = float(request.GET.get("lat"))
            longitude = float(request.GET.get("lng"))
            print(f"Received lat: {latitude}, lng: {longitude}")  # Debugging
            radius = 60000  # 10 km
            search = request.GET.get("search", "").strip()
            search_type = request.GET.get("search_type", "").strip()

            # Step 1: Get nearby hospitals using raw SQL
            sql_query = """
            SELECT accounts_hospital.id, accounts_user.full_name, accounts_hospital.latitude, 
                   accounts_hospital.longitude, 
                   ST_DistanceSphere(accounts_hospital.geom, ST_MakePoint(%s, %s)) AS distance
            FROM accounts_hospital
            JOIN accounts_user ON accounts_user.id = accounts_hospital.user_id
            WHERE ST_DWithin(accounts_hospital.geom, ST_MakePoint(%s, %s), %s, true)
            ORDER BY distance ASC;
            """

            with connection.cursor() as cursor:
                cursor.execute(sql_query, [longitude, latitude, longitude, latitude, radius])
                print(longitude, latitude, longitude, latitude, radius)
                nearby_hospitals = cursor.fetchall()
                print("ok")

            if not nearby_hospitals:
                return Response({"message": "No nearby hospitals found"}, status=status.HTTP_404_NOT_FOUND)

            # Extract hospital IDs and distance mapping
            hospital_distance_map = {row[0]: row[4] for row in nearby_hospitals}  
            nearby_hospital_ids = list(hospital_distance_map.keys())

            # Step 2: Use ORM to filter based on `search_type`
            hospitals = Hospital.objects.filter(id__in=nearby_hospital_ids)

            if search_type == "doctor":
                hospitals = hospitals.filter(hospitaldoctor__doctor__doctor_name__icontains=search) \
                    .annotate(min_cost=Min("hospitaldoctor__appointment_fees_in_hospital")) \
                    .order_by("min_cost")

            elif search_type == "service":
                hospitals = hospitals.filter(hospitalservice__service__name__icontains=search) \
                    .annotate(min_cost=Min("hospitalservice__cost")) \
                    .order_by("min_cost")

            elif search_type == "treatment":
                hospitals = hospitals.filter(hospitaltreatment__treatment__name__icontains=search) \
                    .annotate(min_cost=Min("hospitaltreatment__cost")) \
                    .order_by("min_cost")

            # elif search_type == "symptom":
            #     hospitals = hospitals.filter(hospitaltreatment__treatment__symptoms__icontains=search) \
            #         .annotate(min_cost=Min("hospitaltreatment__cost")) \
            #         .order_by("min_cost")


            elif search_type == "symptom":
                # Step 2.1: Call ML Model
                ml_url = "http://127.0.0.1:8000/ml_app/predict/"  # Update with actual ML model endpoint
                ml_response = requests.post(ml_url, json={
                    "search_type": "symptom",
                    "lat": latitude,
                    "lng": longitude,
                    "search": search
                })

                if ml_response.status_code != 200:
                    return Response({"error": "ML model failed to predict specialization"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                prediction = ml_response.json().get("prediction", [])  # Get predicted specializations

                if not prediction:
                    return Response({"message": "No matching specializations found"}, status=status.HTTP_404_NOT_FOUND)

                # Step 2.2: Filter hospitals with the predicted specializations
                hospitals = hospitals.filter(hospitaldoctor__doctor__specialization__in=prediction) \
                    .annotate(min_cost=Min("hospitaldoctor__appointment_fees_in_hospital")) \
                    .order_by("min_cost")

            # Step 3: Prepare the response
            results = [
                {
                    "id": hospital.id,
                    "name": hospital.user.full_name,
                    "profile_picture": hospital.user.profile_picture,
                    "latitude": hospital.latitude,
                    "longitude": hospital.longitude,
                    "distance": round(hospital_distance_map[hospital.id], 2),  # Attach SQL distance
                    "cost": hospital.min_cost if hasattr(hospital, 'min_cost') else None  # Handle missing cost
                }
                for hospital in hospitals
            ]

            return Response(results, status=status.HTTP_200_OK)

        except (TypeError, ValueError):
            return Response({"error": "Invalid location parameters"}, status=status.HTTP_400_BAD_REQUEST)





class ShowHospitalDetails(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hospital_id = request.GET.get('id')
        search_type = request.GET.get("type", "")
        search_term = request.GET.get("search", "")


        print("1")
        hospital = get_object_or_404(Hospital, id=hospital_id)
        print("2")
        user = get_object_or_404(User, hospital=hospital)
        print("3")

        if search_type == "doctor":
            doctor = get_object_or_404(Doctor, doctor_name = search_term)
            hospital_doctor = get_object_or_404(HospitalDoctor, doctor=doctor, hospital=hospital)

            facility = {
                "doctor_name": doctor.doctor_name,
                "doctor_image": doctor.doctor_image,
                "appointment_fees_in_hospital": hospital_doctor.appointment_fees_in_hospital,
                "specialization_in_hospital": hospital_doctor.specialization_in_hospital,
                "consultation_days": hospital_doctor.consultation_days,
                "availability_in_hospital": hospital_doctor.availability_in_hospital,
            }


        elif search_type == "service":
            print("4")
            # service = get_object_or_404(Service, name = search_term)
            service = Service.objects.filter(name=search_term).first() # because by mistake some services with same names exists in database
            # thats why first is used here
            
            if not service:
                return Response({"error": "Service not found"}, status=404)
            
            print("5")
            hospital_service = get_object_or_404(HospitalService, service=service, hospital=hospital)
            print("6")
            facility = {
                "name": service.name,
                "cost": hospital_service.cost,
                "available_slots": hospital_service.available_slots,
            }


        elif search_type == "treatment":
            treatment = get_object_or_404(Treatment, name = search_term)
            hospital_treatment = get_object_or_404(HospitalTreatment, treatment=treatment, hospital=hospital)

            facility = {
                "name": treatment.name,
                "cost": hospital_treatment.cost,
                "doctor_required": hospital_treatment.doctor_required,
            }

        elif search_type == "symptom":
            hospital_doctors = HospitalDoctor.objects.filter(specialization_in_hospital=search_term, hospital=hospital)

            facility = []
            for hospital_doctor in hospital_doctors:
                facility.append({
            "doctor_name": hospital_doctor.doctor.doctor_name,  # Assuming ForeignKey relation to Doctor
            "doctor_image": hospital_doctor.doctor.doctor_image,
            "appointment_fees_in_hospital": hospital_doctor.appointment_fees_in_hospital,
            "specialization_in_hospital": hospital_doctor.specialization_in_hospital,
            "consultation_days": hospital_doctor.consultation_days,
            "availability_in_hospital": hospital_doctor.availability_in_hospital,
        })

        result = {
            "userProfile": {
                "role": user.role,
                "name": user.full_name,
                "email": user.email,
                "phone_number": user.phone_number,
                "joined_at": user.joined_at,
                "profile_picture": user.profile_picture,
            },
            "HospitalProfile": {
                "hospital_address": hospital.hospital_address,
                "license_number": hospital.license_number,
                "established_year": hospital.established_year,
                "bed_capacity": hospital.bed_capacity,
                "emergency_services": hospital.emergency_services,
            }
        }

        return Response({
            "hospital": result,
            "facility": facility
        },
            status=status.HTTP_200_OK
        )
    


