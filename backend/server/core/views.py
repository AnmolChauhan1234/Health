from django.shortcuts import render

# Create your views here.


# in views.py
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok"})
