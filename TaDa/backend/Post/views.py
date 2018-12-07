from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from json.decoder import JSONDecodeError
import json
from django.db import models
from User.models import User
from .models import Post

# Create your views here.
"""
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        user_type = req_data['user_type']
        email = req_data['email']
        nickname = req_data['nickname']
        password = req_data['password']

        if not User.objects.filter(email = email).exists():
            User.objects.create_user(user_type = user_type, email = email, nickname = nickname, password = password)
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
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])
"""
@csrf_exempt
def posts(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            post_all_list = [post for post in Post.objects.all().values()]
            return JsonResponse(post_all_list, safe = False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
    

@csrf_exempt
def post(request, post_id):
    pass

@csrf_exempt
def author(request, author_id):
    pass

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
