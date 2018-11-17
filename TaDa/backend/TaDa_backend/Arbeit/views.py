from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt

from django.shortcuts import render
from django.shortcuts import get_object_or_404
from .models import Arbeit
import json

from django.utils import timezone

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

# Create your views here.
@csrf_exempt
def arbeit_list(request):
    if request.method == 'GET' or request.method == 'POST':
        #if request.user.is_authenticated:
        if request.method == 'GET':
            arbeit_list = []
            for arbeit in Arbeit.objects.all():
                arbeit_list.append({
                    'id': arbeit.id,
                    #'author_id': arbeit.author.id,
                    'title': arbeit.title, 
                    'content': arbeit.content,
                    #'author': arbeit.author.id,
                    'region': arbeit.region,
                    'arbeit_type': arbeit.arbeit_type,
                    'pay': arbeit.pay,
                    'manager_name': arbeit.manager_name,
                    'manager_phone': arbeit.manager_phone,
                    'register_date': arbeit.register_date,
                    'edit_date': arbeit.edit_date
                    })
            return JsonResponse(arbeit_list, safe=False)
        else:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            content = req_data['content']
            region = req_data['region']
            arbeit_type = req_data['arbeit_type']
            pay = req_data['pay']
            manager_name = req_data['manager_name']
            manager_phone = req_data['manager_phone']

            new_arbeit = Arbeit(title=title, content=content, #author=request.user,
            					region=region, arbeit_type=arbeit_type, pay=pay,
            					manager_name=manager_name, manager_phone=manager_phone, register_date=timezone.now())
            new_arbeit.save()
            return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def arbeit_detail(request, arbeit_id):
        #if request.user.is_authenticated:
        if request.method == 'GET' or request.method == 'PUT' or request.method == 'DELETE':
            arbeit = get_object_or_404(Arbeit, id = arbeit_id)
            if request.method == 'GET':
                return JsonResponse({
                 'id': arbeit.id,
                 #'author_id': arbeit.author.id,
                 'title': arbeit.title, 
                 'content': arbeit.content,
                 #'author': arbeit.author.id,
                 'region': arbeit.region,
                 'arbeit_type': arbeit.arbeit_type,
                 'pay': arbeit.pay,
                 'manager_name': arbeit.manager_name,
                 'manager_phone': arbeit.manager_phone,
                 'register_date': arbeit.register_date,
                 'edit_date': arbeit.edit_date
                }, safe=False)
            elif request.method == 'PUT':
                req_data = json.loads(request.body.decode())
                arbeit.title = req_data['title']
                arbeit.content = req_data['content']
                arbeit.region = req_data['region']
                arbeit.arbeit_type = req_data['arbeit_type']
                arbeit.pay = req_data['pay']
                arbeit.manager_name = req_data['manager_name']
                arbeit.manager_phone = req_data['manager_phone']
                arbeit.edit_date = timezone.now()
                arbeit.save()
                return HttpResponse(status=200)
            else:
                arbeit.delete()
                return HttpResponse(status=200)
        else:
            return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])