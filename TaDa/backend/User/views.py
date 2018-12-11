from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from json.decoder import JSONDecodeError
import json

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string

from django.shortcuts import get_object_or_404
from django.db import models
from .models import User, UserManager

# Create your views here.

@csrf_exempt
def email(request, email):
    if request.method == 'GET':
        if not User.objects.filter(email = email).exists():
            return JsonResponse({'isUnique': True})
        else:
            return JsonResponse({'isUnique': False})
    else:
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def nickname(request, nickname):
    if request.method == 'GET':
        if not User.objects.filter(nickname = nickname).exists():
            return JsonResponse({'isUnique': True})
        else:
            return JsonResponse({'isUnique': False})
    else:
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        nickname = req_data['nickname']
        password = req_data['password']
        user_type = req_data['user_type']
        company_name = req_data['company_name']

        if user_type and password:
            User.objects.create_user(user_type = user_type, email = email, nickname = nickname, 
            password = password, company_name = company_name)
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=409)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        email = req_data['email']
        password = req_data['password']
        user = authenticate(email = email, password = password)
        if user is not None:
            login(request, user)
            user_id = User.objects.filter(email = email)[0].id
            return JsonResponse({'id': user_id}, safe=False)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def signout(request):
    if request.method == 'GET':
        if not request.user:
            return HttpResponse(status=404)
        elif request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])
"""
@csrf_exempt
def validate(request, email):
    if request.method == 'POST':
        target_user = User.objects.get(email=email)

        html_content = render_to_string('authentication_email.html', {
            'user': target_user,
            'domain': 'localhost:4200/email_verification_success',
            'uid': urlsafe_base64_encode(force_bytes(target_user.pk)).decode(),
            'activate_token': PasswordResetTokenGenerator().make_token(target_user),
        })

        email = EmailMultiAlternatives(subject="Validate User", to=[User.email])
        email.attach_alternative(html_content, "text/html")
        email.send()

        return JsonResponse({'successed': True, 'message': '이메일을 전송하였습니다.'})
    else:
        return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def activate(request, target_id, activate_token):
    if request.method == 'GET':
        user = User.objects.get(id=force_text(urlsafe_base64_decode(target_id)))
        if user is not None:
            if PasswordResetTokenGenerator().check_token(user, activate_token):
                if user.is_active:
                    return JsonResponse({'successed': False, 'message': '만료된 링크입니다.'})
                else:
                    user.is_active = True
                    user.save()
                    return JsonResponse({'successed': True, 'message': user.email + ' 계정이 활성화 되었습니다.'})
            else:
                return JsonResponse({'successed': False, 'message': '잘못된 링크입니다.'})
        else:
            return JsonResponse({'successed': False, 'message': '존재하지 않는 사용자입니다.'})
    else:
        return HttpResponseNotAllowed(['GET'])
"""
@csrf_exempt    
def user(request, uid):
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_user = User.objects.filter(id=uid)
            if target_user.exists():
                user_dict = target_user.values()[0]
                del user_dict['last_login']
                return JsonResponse(user_dict, safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            target_user = User.objects.filter(id=uid)
            if target_user.exists():
                target_user = target_user[0]
                if target_user.id == request.user.id:
                    #columns = ["user_type", "email", "password", "nickname", "employee_region", "employee_type", "employee_how_to_pay", "employee_pay_limit", "company_name", "company_address", "business_content", "representative_name", "employer_license_number", "profile_image"]
                    req_data = json.loads(request.body.decode())
                    if target_user.user_type == 'EE':
                        target_user.set_password(req_data["password"])
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
                        target_user.save()
                        return HttpResponse(status=200)
                    elif target_user.user_type == 'ER':
                        target_user.set_password(req_data["password"])
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
                        target_user.save()
                        return HttpResponse(status=200)
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

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
