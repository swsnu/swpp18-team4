from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from json.decoder import JSONDecodeError
from django.core.serializers.json import DjangoJSONEncoder
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
            try:
                req_data = json.loads(request.body.decode())
                post = Post.objects.filter(id = req_data['post_id'])[0]
                refer_comment_id = req_data['refer_comment_id']
                author = request.user
                star = req_data['star']
                content = req_data['content']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponseBadRequest()

            Comment.objects.create(author = author, refer_comment_id = refer_comment_id, post = post, star = star, content = content)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
    
@csrf_exempt
def comment(request, comment_id):
    if request.method == 'GET':
        target_comment = Comment.objects.filter(id = comment_id)
        if target_comment.exists():
            return JsonResponse(target_comment.values()[0], safe=False)
        else:
            return HttpResponse(status=404)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            target_comment = Comment.objects.filter(id = comment_id)
            if target_comment.exists():
                target_comment = target_comment[0]
                if target_comment.author == request.user:
                    try:
                        req_data = json.loads(request.body.decode())
                        #post = Post.objects.filter(id = req_data['post_id'])
                        #refer_comment_id = req_data['refer_comment_id']
                        #author = request.user
                        target_comment.star = req_data['star']
                        target_comment.content = req_data['content']
                        #register_date = models.DateTimeField('first published date', auto_now_add = True)
                        #last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
                    except (KeyError, JSONDecodeError) as e:
                        return HttpResponseBadRequest()
                        
                    target_comment.save()
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
                if target_comment.author == request.user:
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
            target_post = Post.objects.filter(id = post_id)
            if target_post.exists():
                target_post = target_post[0]
                comment_list = [comment for comment in Comment.objects.filter(post = target_post).values()]
                return JsonResponse(comment_list, safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=404)
    else: 
        return HttpResponseBadRequest(['GET'])

@csrf_exempt
def commentByAuthor(request, author_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_author = User.objects.filter(id = author_id)
            if target_author.exists():
                target_author = target_author[0]
                comment_list = [comment for comment in Comment.objects.filter(author = target_author).values()]
                return JsonResponse(comment_list, safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=404)
    else: 
        return HttpResponseBadRequest(['GET'])

#버그
@csrf_exempt
def commentReceive(request, author_id):
    if request.method == 'GET':
        if request.user.is_authenticated:
            target_author = User.objects.filter(id = author_id)
            if target_author.exists():
                target_author = target_author[0]
                post_id_list = [post['id'] for post in Post.objects.filter(author = target_author).values()]
                comment_list = []
                for pid in post_id_list:
                    comment_list_pid = [comment for comment in Comment.objects.filter(post_id = pid).values()] 
                    comment_list += comment_list_pid
                return JsonResponse(comment_list, safe=False)
            else:
                return HttpResponse(status=403)
        else:
            return HttpResponse(status=404)
    else:
        return HttpResponseBadRequest(['GET'])
#

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])