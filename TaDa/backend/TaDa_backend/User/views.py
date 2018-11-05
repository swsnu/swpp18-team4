from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from User.models import TaDa_User, Employee_preference, Employer_introduction
from django.db import models

# Create your views here.

def signup(request):
    pass

def signin(request):
    pass

def signout(request):
    pass

def employee_info(request):
    pass

def employer_info(request):
    pass

def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])