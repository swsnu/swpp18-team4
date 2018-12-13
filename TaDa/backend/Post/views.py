from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from django.core.serializers.json import DjangoJSONEncoder
from json.decoder import JSONDecodeError
import datetime
import json
from django.db import models
from User.models import User
from .models import Post


# Create your views here.

def posts(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            post_all_list = [post for post in Post.objects.all().values()]
            return JsonResponse(post_all_list, safe = False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
                author = request.user
                title = req_data['title']
                content = req_data['content']
                region = req_data['region']
                region_specific = req_data['region_specific']
                arbeit_type = req_data['arbeit_type']    
                how_to_pay = req_data['how_to_pay']
                pay_per_hour = req_data['pay_per_hour']
                goods = req_data['goods']
                timezone = req_data['timezone']
                #register_date = models.DateTimeField('first published date', auto_now_add = True)
                #last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
                deadline = req_data['deadline']
                home_expect_time = req_data['home_expect_time']
                #is_magam_user = models.BooleanField(default = False)
                #is_magam_timeout = models.BooleanField(default = False)
                is_same_person = req_data['is_same_person']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponseBadRequest()

            Post.objects.create(author = author, title = title, content = content, region = region, region_specific = region_specific, arbeit_type = arbeit_type,
            how_to_pay = how_to_pay, goods = goods, timezone = timezone, deadline = deadline, home_expect_time = home_expect_time, is_same_person = is_same_person)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
    
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
                    try:
                        req_data = json.loads(request.body.decode())
                        target_post.title = req_data['title']
                        target_post.content = req_data['content']
                        target_post.region = req_data['region']
                        target_post.region_specific = req_data['region_specific']
                        target_post.arbeit_type = req_data['arbeit_type']    
                        target_post.how_to_pay = req_data['how_to_pay']
                        target_post.pay_per_hour = req_data['pay_per_hour']
                        target_post.goods = req_data['goods']
                        target_post.timezone = req_data['timezone']
                        #register_date = models.DateTimeField('first published date', auto_now_add = True)
                        #last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
                        target_post.deadline = req_data['deadline']
                        target_post.home_expect_time = req_data['home_expect_time']
                        #is_magam_user = models.BooleanField(default = False)
                        #is_magam_timeout = models.BooleanField(default = False)
                        target_post.is_same_person = req_data['is_same_person']
                    except (KeyError, JSONDecodeError) as e:
                        return HttpResponseBadRequest()

                    target_post.save()
                    return HttpResponse(status=200)
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
