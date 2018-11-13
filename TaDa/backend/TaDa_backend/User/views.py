from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt

import json
from .models import TaDa_User, Employee_preference, Employer_introduction
from django.db import models

from django.shortcuts import get_object_or_404

# Create your views here.

def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        first_name = req_data['first_name']
        last_name = req_data['last_name']
        password = req_data['password']
        employ_type = req_data['employ_type']
        
        if not User.objects.filter(username = email).exists():
            user = User.objects.create_user(username = email, password = password, email = email, first_name = first_name, last_name = last_name)
            TaDa_User.objects.create(user = user, employ_type = employ_type)
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=409)
    else:
        return HttpResponseNotAllowed(['POST'])


def authenticate_email(request, email):
    if request.method == 'GET':
        if not User.objects.filter(username = email).exists():
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=409)
    else:
        return HttpResponseNotAllowed(['GET'])
        

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        user = authenticate(username = email, password = password)
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


def employee_info(request, employee_id): # employee_id is User's id, not TaDa_User's id
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_user = Employee_preference.objects.filter(employee_id=employee_id).values()
            if target_user.exists():
                if employee_id == request.user.id:
                    return JsonResponse(json.dumps(target_user[0]), safe=False)
                else:
                    return HttpResponse(status=403)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated: 
            if employee_id == request.user.id:
                target_employee = User.objects.filter(id = employee_id)
                req_data = json.loads(request.body.decode())
                region = req_data['region']
                #timezone
                arbeit_type = req_data['arbeit_type']
                employee = Employee_preference(
                    employee_id = target_employee, 
                    region = region, 
                    arbeit_type = arbeit_type
                ) #timezone
                employee.save()
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        pass
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'PUT'])
        


@csrf_exempt
def employer_info(request, employer_id):
    employer = get_object_or_404(Employer_introduction, id = employer_id)
    if request.method == 'GET':
        return JsonResponse({
                'id': employer.id, 
                'company_name': employer.company_name,
                'company_address': employer.company_address,
                'business_content': employer.business_content,
                'representative_name': employer.representative_name,
                'representative_phonenumber': employer.representative_phonenumber
                }
            , safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

'''
def employer_info(request, employer_id): # employer_id is User's id, not TaDa_User's id
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_user = Employer_introduction.objects.filter(employer_id=employer_id).values()
            if target_user.exists():
                if employer_id == request.user.id:
                    return JsonResponse(json.dumps(target_user[0]), safe=False)
                else:
                    return HttpResponse(status=403)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            if employer_id == request.user.id:
                req_data = json.loads(request.body.decode())
                target_employer = User.objects.filter(id=employer_id)
                company_name = req_data['company_name']
                company_address = req_data['company_address']
                business_content = req_data['business_content']
                representative_name = req_data['representative_name']
                representative_phonenumber = req_data['representative_phonenumber']
                employer = Employer_introduction(
                    employer_id = target_employer, 
                    company_name = company_name, 
                    company_address = company_address, 
                    business_content = business_content,
                    representative_name = representative_name,
                    representative_phonenumber = representative_phonenumber
                )
                employer.save()
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        pass
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'PUT'])
'''

def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
