from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import AuthenticationFailed
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import IsAuthenticated



class RegisterView(APIView):
    permission_classes = [AllowAny]  # Add permission classes here
    
    @csrf_exempt
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            user.refresh_token = str(refresh)
            user.save()
            
            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'message': 'User registered successfully!'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            # Authenticate the user
            user = serializer.validated_data
            if not user:
                raise AuthenticationFailed('Invalid username or password')

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Store the new refresh token in the database
            user.refresh_token = refresh_token
            user.save()

            return Response({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

User = get_user_model()

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("refresh token view called")
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({"detail": "Refresh token missing or invalid format."}, status=status.HTTP_400_BAD_REQUEST)

        refresh_token = auth_header.split(' ')[1] 

        try:
            decoded_refresh = RefreshToken(refresh_token)
            id = decoded_refresh['user_id']  

            user = User.objects.get(id=id)

            if user.refresh_token != refresh_token:
                return Response({"detail": "Invalid refresh token."}, status=status.HTTP_401_UNAUTHORIZED)

            new_refresh = RefreshToken.for_user(user)
            
            new_access = new_refresh.access_token
            

            user.refresh_token = str(new_refresh)
            user.save()

            return Response({
                'access': str(new_access),
                'refresh': str(new_refresh),
                'message': 'New access and refresh tokens issued.'
            }, status=status.HTTP_200_OK)

        except TokenError:
            return Response({"detail": "Invalid or expired refresh token."}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)



class LogoutView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self, request):
        request.user.refresh_token = None
        request.user.save()

        response = Response({"message": "Logged out successfully"})
        return response