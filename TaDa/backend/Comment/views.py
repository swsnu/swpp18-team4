from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from json.decoder import JSONDecodeError
import json
from django.db import models
from User.models import User
from Post.models import Post
from .models import Comment

# Create your views here.
@csrf_exempt
def comments(request):
    pass

@csrf_exempt
def comment(request, comment_id):
    pass

@csrf_exempt
def commentByPost(request, post_id):
    pass

@csrf_exempt
def commentByAuthor(request, author_id):
    pass

@csrf_exempt
def commentReceive(request, author_id):
    pass


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])