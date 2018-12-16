from django.test import TestCase, Client
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from json.decoder import JSONDecodeError
import json
import datetime
from django.shortcuts import get_object_or_404
from django.db import models
from User.models import User, UserManager
from Post.models import Post
from django.core.serializers.json import DjangoJSONEncoder

# Create your tests here.

class PostTestCase(TestCase):

    def test_posts_get_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.get('/api/post/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content , [])
    
    def test_posts_get_not_authenticated(self):
        client = Client()
        response = client.get('/api/post/')
        self.assertEqual(response.status_code, 401)

    def test_posts_post_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.post('/api/post/', data = json.dumps({
            'title': 'a',
            'content': 'b',
            'region': 'c',
            'region_specific': 'd',
            'arbeit_type': 'e',    
            'how_to_pay': 'f',
            'pay_per_hour': 10000,
            'goods': None,
            'timezone': ['2018-01-01 16:30', '2018-01-01 18:30'],
            #register_date = models.DateTimeField('first published date', auto_now_add = True)
            #last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
            'deadline': datetime.datetime.strptime("2018-01-02 16:30", "%Y-%m-%d %H:%M"),
            'home_expect_time': 10,
                #is_magam_user = models.BooleanField(default = False)
                #is_magam_timeout = models.BooleanField(default = False)
            'is_same_person': True,
        }, cls=DjangoJSONEncoder), content_type="application/json") #DjangoJSONEncoder
        self.assertEqual(response.status_code, 200)
    
    def test_posts_post_JSONerror(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': 'a',
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.post('/api/post/', data = json.dumps({
            'content': 'b',
            'region': 'c',
            'region_specific': 'd',
            'arbeit_type': 'e',    
            'how_to_pay': 'f',
            'pay_per_hour': 10000,
            'goods': None,
            'timezone': ['2018-01-01 16:30', '2018-01-01 18:30'],
            #register_date = models.DateTimeField('first published date', auto_now_add = True)
            #last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
            'deadline': datetime.datetime.strptime("2018-01-02 16:30", "%Y-%m-%d %H:%M"),
            'home_expect_time': 10,
            #is_magam_user = models.BooleanField(default = False)
            #is_magam_timeout = models.BooleanField(default = False)
            'is_same_person': True,
        }, cls=DjangoJSONEncoder), content_type="application/json") #DjangoJSONEncoder
            
        self.assertEqual(response.status_code, 400)
    
    def test_posts_post_not_authenticated(self):
        client = Client()
        response = client.post('/api/post/', data = json.dumps({
            'title': 'a',
            'content': 'b',
            'region': 'c',
            'region_specific': 'd',
            'arbeit_type': 'e',    
            'how_to_pay': 'f',
            'pay_per_hour': 10000,
            'goods': None,
            'timezone': ['2018-01-01-16-30', '2018-01-01-18-30'],
            #register_date = models.DateTimeField('first published date', auto_now_add = True)
            #last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
            'deadline': datetime.datetime.strptime("2018-01-02 16:30", "%Y-%m-%d %H:%M"),
            'home_expect_time': 10,
                #is_magam_user = models.BooleanField(default = False)
                #is_magam_timeout = models.BooleanField(default = False)
            'is_same_person': True,
        }, cls=DjangoJSONEncoder), content_type="application/json") #DjangoJSONEncoder
        self.assertEqual(response.status_code, 401)
    
    def test_posts_else(self):
        client = Client()
        response = client.put('/api/post/')
        self.assertEqual(response.status_code, 405)
    
    def test_post_get_success(self):
        client = Client()
        response = client.get('/api/post/')
        pass
    
    def test_post_get_not_authenticated(self):
        pass

    def test_post_get_not_exist(self):
        pass

    def test_post_put_success(self):
        pass
    
    def test_post_put_not_authenticated(self):
        pass
    
    def test_post_put_not_exist(self):
        pass
    
    def test_post_put_not_authorized(self):
        pass
    
    def test_post_put_JSONerror(self):
        pass
    
    def test_post_delete_success(self):
        pass
    
    def test_post_delete_not_authenticated(self):
        pass
    
    def test_post_delete_not_exist(self):
        pass
    
    def test_post_delete_not_authorized(self):
        pass
    
    def test_post_else(self):
        client = Client()
        response = client.post('/api/post/1')
        self.assertEqual(response.status_code, 405)
    
    def test_author_get_success(self, author_id):
        pass
    
    def test_author_get_not_authenticated(self, author_id):
        pass
    
    def test_author_else(self, author_id):
        client = Client()
        url = '/api/author/' + str(author_id)
        response = client.post(url)
        self.assertEqual(response.status_code, 405)
    """
    def test_token_get(self):
        client = Client()
        response = client.get('/api/post/token/')
        self.assertEqual(response.status_code, 204)

    def test_token_else(self):
        client = Client()
        response = client.post('/api/post/token/')
        self.assertEqual(response.status_code, 405)
