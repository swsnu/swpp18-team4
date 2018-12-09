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
    if request.method == 'POST':
        if request.user.is_authenticated:
            # modify
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
    
@csrf_exempt
def comment(request, comment_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_comment = Comment.objects.filter(id = comment_id)
            if target_comment.exists():
                return JsonResponse(json.dumps(target_comment.values(), content_type="application/json"), safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            target_comment = Comment.objects.filter(id = comment_id)
            if target_comment.exists():
                if target_comment.author_id == request.user.id:
                    # modify
                    return HttpResponse(status=200)
                else:
                    return HttpResponse(status=403)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'DELETE':
        if request.user.is_authenticated:
            target_comment = Comment.objects.filter(id = comment_id)
            if target_comment.exists():
                if target_comment.author_id == request.user.id:
                    target_comment.delete()
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
def commentByPost(request, post_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            comment_list = [comment for comment in Comment.objects.filter(post_id = post_id).values()]
            return JsonResponse(comment_list, safe=False)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseBadRequest(['GET'])

@csrf_exempt
def commentByAuthor(request, author_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            comment_list = [comment for comment in Comment.objects.filter(comment_id = author_id).values()]
            return JsonResponse(comment_list, safe=False)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseBadRequest(['GET'])

@csrf_exempt
def commentReceive(request, author_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            if author_id == request.user.id:
                post_id_list = [post.id for post in Post.objects.filter(author_id = author_id).values()]
                for pid in post_id_list:
                    comment_list = [comment for comment in Comment.objects.filter(post_id = pid).values()]
                return JsonResponse(comment_list, safe=False)
            else:
                return HttpResponse(status=403)
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