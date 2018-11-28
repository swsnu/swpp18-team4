from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt
from json.decoder import JSONDecodeError
import json

from django.shortcuts import get_object_or_404
from django.db import models
from .models import User, UserManager

# Create your views here.

def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        user_type = req_data['user_type']
        email = req_data['email']
        nickname = req_data['nickname']
        password = req_data['password']

        if not User.objects.filter(username = email).exists():
            User.objects.create_user(user_type = user_type, email = email, nickname = nickname, password = password)
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=409)
    else:
        return HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        user = authenticate(email = email, password = password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

def validate(request, email):
    pass
    

def user(reqeust, id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_user = User.objects.filter(id=id).values()
            if target_user.exists():
                return JsonResponse(json.dumps(target_user[0], safe=False))
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            target_user = User.objects.filter(id=id).values()
            if target_user.exists():
                if target_user.id == request.user.id:
                    columns = ["user_type", "email", "password", "nickname", "employee_region", "employee_type", "employee_how_to_pay", "employee_pay_limit", "company_name", "company_address", "business_content", "representative_name", "employer_license_number", "profile_image"]
                    req_data = json.loads(request.body.decode())
                    if user_type == 'EE':
                        target_user.set_password(req_data["password"])
                        target_user.nickname = req_data["nickname"]
                        target_user.employee_region = req_data["employee_region"]
                        target_user.employee_type = req_data["employee_type"]
                        target_user.employee_how_to_pay = req_data["employee_how_to_pay"]
                        target_user.employee_pay_limit = req_data["employee_pay_limit"]
                        target_user.company_name = None
                        target_user.company_address = None
                        target_user.business_content = None
                        target_user.representative_name = None
                        target_user.employer_license_number = None
                        target_user.profile_image = req_data["profile_image"]
                    elif user_type == 'ER':
                        target_user.set_password(req_data["password"])
                        target_user.nickname = req_data["nickname"]
                        target_user.employee_region = None
                        target_user.employee_type = None
                        target_user.employee_how_to_pay = None
                        target_user.employee_pay_limit = None
                        target_user.company_name = req_data["company_name"]
                        target_user.company_address = req_data["company_address"]
                        target_user.business_content = req_data["business_content"]
                        target_user.representative_name = req_data["representative_name"]
                        target_user.employer_license_number = req_data["employer_license_number"]
                        target_user.profile_image = req_data["profile_image"]
                    else:
                        return HttpResponseBadRequest()
                    #keylist = list(req_data.keys())
                else:
                    return HttpResponse(status=403)
            else:
                return HttpResponse(status=404)
            
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
