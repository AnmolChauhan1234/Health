from django.urls import path
from .views import UpdateProfileView, ResetPasswordView, ViewProfileView, ShowProfilePictureView

urlpatterns = [
    path('update/', UpdateProfileView.as_view(), name='update_profile'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('view-profile/', ViewProfileView.as_view(), name='view_profile'),
    path('show-profile-picture/', ShowProfilePictureView.as_view(), name='show_profile_picture')
]