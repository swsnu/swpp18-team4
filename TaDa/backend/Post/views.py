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
    if request.method == 'GET':
        if request.user.is_authenticated:
            post_all_list = [post for post in Post.objects.all().values()]
            return JsonResponse(post_all_list, safe = False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            # modify
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
    

@csrf_exempt
def post(request, post_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_post = Post.objects.filter(id = post_id)
            if target_post.exists():
                return JsonResponse(json.dumps(target_post.values(), content_type="application/json"), safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            target_post = Post.objects.filter(id = post_id)
            if target_post.exists():
                if target_post.author_id == request.user.id:
                    # modify
                    return HttpResponse(stauts=200)
                else:
                    return HttpResponse(status=403)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            target_post = Post.objects.filter(id = post_id)
            if target_post.exists():
                if target_post.author_id == request.user.id:
                    target_post.delete()
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=403)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])

@csrf_exempt
def author(request, author_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            post_list = [post for post in Post.objects.filter(author_id = author_id).values()]
            return JsonResponse(post_list, safe=False)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseBadRequest(['GET'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
