from django.urls import path
from .views import UpdateProfileView, ResetPasswordView

urlpatterns = [
    path('update/', UpdateProfileView.as_view(), name='update_profile'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password')
]