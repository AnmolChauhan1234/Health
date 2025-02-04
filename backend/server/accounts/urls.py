from django.urls import path
from .views import RegisterView, LoginView, CustomTokenRefreshView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('custom-refresh/', CustomTokenRefreshView.as_view(), name='custom_token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
]