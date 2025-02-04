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
from django.conf import settings
from django.http import JsonResponse



class RegisterView(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            # Save refresh token in the database
            user.refresh_token = str(refresh)
            user.save()

            response = JsonResponse({
                'access_token': str(refresh.access_token),
                'message': 'User registered successfully!'
            }, status=status.HTTP_201_CREATED)

            # Store refresh token in HttpOnly cookie
            response.set_cookie(
                'refresh_token', str(refresh),
                httponly=True,
                secure=settings.SECURE_COOKIE,
                max_age=settings.REFRESH_TOKEN_EXPIRATION,
                samesite='Strict'
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            if not user:
                raise AuthenticationFailed('Invalid username or password')

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Store the refresh token in the database
            user.refresh_token = str(refresh)
            user.save()

            response = JsonResponse({
                'access_token': access_token,
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)

            # Store refresh token in HttpOnly cookie
            response.set_cookie(
                'refresh_token', str(refresh),
                httponly=True,
                secure=settings.SECURE_COOKIE,
                max_age=settings.REFRESH_TOKEN_EXPIRATION,
                samesite='Strict'
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()

class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("refresh token view called")

        # Get refresh token from cookies (NOT headers)
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"detail": "Refresh token missing."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_refresh = RefreshToken(refresh_token)
            id = decoded_refresh['user_id']  

            user = User.objects.get(id=id)

            if user.refresh_token != refresh_token:
                return Response({"detail": "Invalid refresh token."}, status=status.HTTP_401_UNAUTHORIZED)

            new_refresh = RefreshToken.for_user(user)
            new_access = new_refresh.access_token

            response = JsonResponse({
                'access': str(new_access),
                'message': 'New access token issued.'
            }, status=status.HTTP_200_OK)

            # Update refresh token in HttpOnly cookie
            response.set_cookie(
                'refresh_token', str(new_refresh),
                httponly=True,
                secure=settings.SECURE_COOKIE,
                max_age=settings.REFRESH_TOKEN_EXPIRATION,
                samesite='Strict'
            )

            # Save new refresh token in the database
            user.refresh_token = str(new_refresh)
            user.save()

            return response

        except TokenError:
            return Response({"detail": "Invalid or expired refresh token."}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)




class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Remove refresh token from the database
        user.refresh_token = None
        user.save()

        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

        # Clear refresh token cookie
        response.delete_cookie('refresh_token')

        return response
