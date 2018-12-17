from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt 
from django.core.serializers.json import DjangoJSONEncoder
from django.utils import timezone
from json.decoder import JSONDecodeError
import datetime
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
            try:
                req_data = json.loads(request.body.decode())
                author = User.objects.filter(id = request.user.id)[0]
                if author.user_type == 'ER':
                    author_name = author.company_name
                else:
                    author_name = author.nickname
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
                latitude = req_data['latitude']
                longitude = req_data['longitude']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponseBadRequest()

            Post.objects.create(author = author, author_name = author_name, title = title, content = content, region = region, region_specific = region_specific, arbeit_type = arbeit_type,
            how_to_pay = how_to_pay, pay_per_hour = pay_per_hour, goods = goods, timezone = timezone, deadline = deadline, home_expect_time = home_expect_time, is_same_person = is_same_person, latitude = latitude, longitude = longitude)

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
                return JsonResponse(target_post.values()[0], safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            target_post = Post.objects.filter(id = post_id)
            if target_post.exists():
                target_post = target_post[0]
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
                        target_post.is_magam_user = req_data['is_magam_user']
                        target_post.is_magam_timeout = req_data['is_magam_timeout']
                        target_post.is_same_person = req_data['is_same_person']
                        target_post.latitude = req_data['latitude']
                        target_post.longitude = req_data['longitude']
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
                target_post = target_post[0]
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
            target_author = User.objects.filter(id = author_id)
            if target_author.exists():
                post_list = [post for post in Post.objects.filter(author__in = target_author).values()]
                return JsonResponse(post_list, safe=False)
            else:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def alarm(request):
    from django.utils import timezone
    if request.method == 'GET':
        if request.user.is_authenticated:
            startdate = datetime.datetime.now(tz=timezone.utc)
            enddate = startdate + datetime.timedelta(days=2)
            post_list = [post for post in Post.objects.filter(deadline__range=[startdate, enddate]).values()]
            return JsonResponse(post_list, safe=False)
        else:
            return HttpResponse(status=401)
    else: 
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
