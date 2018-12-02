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

@csrf_exempt
def posts(request):
    pass

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