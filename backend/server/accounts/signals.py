import random
import uuid
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now
from .models import User


@receiver(post_save, sender=User)
def send_password_reset_email(sender, instance, created, update_fields=None, **kwargs):
    """Send email only when reset_token is updated"""
    if not created and update_fields and "reset_token" in update_fields:
        otp = str(random.randint(100000, 999999))
        instance.otp = otp
        instance.otp_created_at = now()
        instance.save(update_fields=["otp", "otp_created_at"])

        reset_link = f"http://localhost:8000/accounts/reset-password/{instance.reset_token}/"

        print("before sending of email")

        send_mail(
            "Password Reset Request",
            f"Your OTP: {otp}\nClick the link to reset password: {reset_link}",
            "chauhananmol2222@gmail.com",
            [instance.email],
            fail_silently=False,
        )


        print("after sending of email")