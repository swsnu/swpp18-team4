from django.test import TestCase

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
from .models import Comment
from django.core.serializers.json import DjangoJSONEncoder

# Create your tests here.

class PostTestCase(TestCase):

    def test_comments_post_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        response = client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_comments_post_not_authenticated(self):
        client = Client()
        response = client.post('/api/comment/')
        self.assertEqual(response.status_code, 401)
    
    def test_comments_post_JSONerror(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        response = client.post('/api/comment/', data = json.dumps({
            'refer_comment_id': 1.5,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        self.assertEqual(response.status_code, 400)
    
    def test_comments_else(self):
        client = Client()
        response = client.get('/api/comment/')
        self.assertEqual(response.status_code, 405)
    
    def test_comment_get_success(self): 
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(star = 0)[0].id
        url = '/api/comment/' + str(comment_id) + '/'
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertJSONNotEqual(response.content, [])
    
    def test_comment_get_not_exist(self):
        client = Client()
        response = client.get('/api/comment/1/')
        self.assertEqual(response.status_code, 404)
    
    def test_comment_put_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(star = 0)[0].id
        url = '/api/comment/' + str(comment_id) + '/'
        response = client.put(url, data = json.dumps({
            'star': 1,
            'content': 'c',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        self.assertEqual(response.status_code, 200)
    
    def test_comment_put_not_authenticated(self):
        client = Client()
        response = client.put('/api/comment/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_comment_put_not_exist(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.put('/api/comment/1/')
        self.assertEqual(response.status_code, 404)
    
    def test_comment_put_not_authorized(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        User.objects.create_user(user_type = 'EE', email = 'd@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(star = 0)[0].id
        url = '/api/comment/' + str(comment_id) + '/'
        client.get('/api/user/signout/')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'd@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.put(url, data = json.dumps({
            'star': 1,
            'content': 'c',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        self.assertEqual(response.status_code, 403)
    
    def test_comment_put_JSONerror(self):      
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(star = 0)[0].id
        url = '/api/comment/' + str(comment_id) + '/'
        response = client.put(url, data = json.dumps({
            'content': 'c',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        self.assertEqual(response.status_code, 400)
    
    def test_comment_delete_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(star = 0)[0].id
        url = '/api/comment/' + str(comment_id) + '/'
        response = client.delete(url)
        self.assertEqual(response.status_code, 200)
    
    def test_comment_delete_not_authenticated(self):
        client = Client()
        response = client.delete('/api/comment/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_comment_delete_not_exist(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.delete('/api/comment/1/')
        self.assertEqual(response.status_code, 404)
    
    def test_comment_delete_not_authorized(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        User.objects.create_user(user_type = 'EE', email = 'd@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(star = 0)[0].id
        url = '/api/comment/' + str(comment_id) + '/'
        client.get('/api/user/signout/')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'd@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.put(url, data = json.dumps({
            'star': 1,
            'content': 'c',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        self.assertEqual(response.status_code, 403)

    def test_comment_else(self):
        client = Client()
        response = client.post('/api/comment/1/')
        self.assertEqual(response.status_code, 405)
    
    def test_commentByPost_get_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        url = '/api/comment/post/' + str(post_id) + '/'
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertJSONNotEqual(response.content, [])
    
    def test_commentByPost_get_not_authenticated(self):
        client = Client()
        response = client.get('/api/comment/post/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_commentByPost_get_not_exist(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.get('/api/comment/post/1/')
        self.assertEqual(response.status_code, 404)
    
    def test_commentByPost_else(self):
        client = Client()
        response = client.post('/api/comment/post/1/')
        self.assertEqual(response.status_code, 405)
    
    def test_commentByAuthor_get_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        user_id = User.objects.filter(email = 'abc@snu.ac.kr')[0].id
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        url = '/api/comment/author/' + str(user_id) + '/'
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertJSONNotEqual(response.content, [])
    
    def test_commentByAuthor_get_not_authenticated(self):
        client = Client()
        response = client.get('/api/comment/author/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_commentByAuthor_get_not_exist(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.get('/api/comment/author/2/')
        self.assertEqual(response.status_code, 404)
    
    def test_commentByAuthor_else(self):
        client = Client()
        response = client.post('/api/comment/author/1/')
        self.assertEqual(response.status_code, 405)
    
    def test_commentReceive_get_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        user_id = User.objects.filter(email = 'abc@snu.ac.kr')[0].id
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(post_id = post_id)[0].id

        User.objects.create_user(user_type = 'ER', email = 'd@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'd@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': comment_id,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        url = '/api/comment/receive/' + str(user_id) + '/'
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertJSONNotEqual(response.content, [])
    
    def test_commentReceive_get_not_authenticated(self):
        client = Client()
        response = client.get('/api/comment/receive/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_commentReceive_get_not_exist(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.get('/api/comment/receive/2/')
        self.assertEqual(response.status_code, 404)
    
    def test_commentReceive_else(self):
        client = Client()
        response = client.post('/api/comment/receive/1/')
        self.assertEqual(response.status_code, 405)
    
    def test_commentRefer_get_success(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        user_id = User.objects.filter(email = 'abc@snu.ac.kr')[0].id
        client.post('/api/post/', data = json.dumps({
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
            'latitude': 1.1,
            'longitude': 1.2,
        }, cls=DjangoJSONEncoder), content_type="application/json")
        post_id = Post.objects.filter(title = 'a')[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': None,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        comment_id = Comment.objects.filter(post_id = post_id)[0].id
        client.post('/api/comment/', data = json.dumps({
            'post_id': post_id,
            'refer_comment_id': comment_id,
            'star': 0,
            'content': 'b',
        }, cls=DjangoJSONEncoder), content_type="application/json")
        url = '/api/comment/refer/' + str(comment_id) + '/'
        response = client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertJSONNotEqual(response.content, [])
    
    def test_commentRefer_get_not_authenticated(self):
        client = Client()
        response = client.get('/api/comment/refer/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_commentRefer_get_not_exist(self):
        client = Client()
        User.objects.create_user(user_type = 'ER', email = 'abc@snu.ac.kr', password = 'a')
        client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        response = client.get('/api/comment/refer/2/')
        self.assertEqual(response.status_code, 404)
    
    def test_commentRefer_else(self):
        client = Client()
        response = client.post('/api/comment/refer/1/')
        self.assertEqual(response.status_code, 405)

    def test_token_get(self):
        client = Client()
        response = client.get('/api/post/token/')
        self.assertEqual(response.status_code, 204)

    def test_token_else(self):
        client = Client()
        response = client.post('/api/post/token/')
        self.assertEqual(response.status_code, 405)
