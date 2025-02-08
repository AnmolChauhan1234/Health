from django.urls import path
from .views import UpdateProfileView, ResetPasswordView, ViewProfileView

urlpatterns = [
    path('update/', UpdateProfileView.as_view(), name='update_profile'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('view-profile/', ViewProfileView.as_view(), name='view_profile')
]