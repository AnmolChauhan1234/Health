from django.urls import path
from .views import RegisterView, LoginView, CustomTokenRefreshView, LogoutView, PasswordForgetRequestView, PasswordForgetView, DeleteUser, isAuth, ContactUs

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('custom-refresh/', CustomTokenRefreshView.as_view(), name='custom_token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forget-password/', PasswordForgetRequestView.as_view(), name='password-reset-request'),
    path('forget-password/<uuid:token>/', PasswordForgetView.as_view(), name='password-forget'),
    path('delete-user/', DeleteUser.as_view(), name='delete_user'),
    path('isAuth/', isAuth, name='isAuth'),
    path('contact-us/', ContactUs.as_view(), name='contact_us')
]