from django.urls import path
from .views import RegisterView, LoginView, CustomTokenRefreshView, LogoutView, PasswordResetRequestView, PasswordResetView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('custom-refresh/', CustomTokenRefreshView.as_view(), name='custom_token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('reset-password/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('reset-password/<uuid:token>/', PasswordResetView.as_view(), name='password-reset'),
]