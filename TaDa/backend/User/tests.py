from django.test import TestCase, Client
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from json.decoder import JSONDecodeError
import json

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string

from django.shortcuts import get_object_or_404
from django.db import models
from .models import User, UserManager

# There are 'profile_image' attribute in test, not in views.

class UserTestCase(TestCase):

#email
    def test_email_get_true(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        response = client.get('/api/user/email/a@snu.ac.kr/')
        self.assertJSONEqual(response.content, {'isUnique': True})
    
    def test_email_get_false(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        response = client.get('/api/user/email/abc@snu.ac.kr/')
        self.assertJSONEqual(response.content, {'isUnique': False})
    
    def test_email_else(self):
        client = Client()
        response = client.delete('/api/user/email/a@abc.com/')
        self.assertEqual(response.status_code, 405)

#nickname
    def test_nickname_get_true(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        response = client.get('/api/user/nickname/b/')
        self.assertJSONEqual(response.content, {'isUnique': True})
    
    def test_nickname_get_false(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        response = client.get('/api/user/nickname/a/')
        self.assertJSONEqual(response.content, {'isUnique': False})
    
    def test_nickname_else(self):
        client = Client()
        response = client.delete('/api/user/nickname/a/')
        self.assertEqual(response.status_code, 405)

#token
    def test_token_get(self):
        client = Client()
        response = client.get('/api/user/token/')
        self.assertEqual(response.status_code, 204)

    def test_token_else(self):
        client = Client()
        response = client.post('/api/user/token/')
        self.assertEqual(response.status_code, 405)

#signup
    def test_signup_post_success(self):
        client = Client()
        response = client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_signup_post_JSONerror(self):
        client = Client()
        response = client.post('/api/user/signup/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        self.assertEqual(response.status_code, 400)
    
    def test_signup_post_not_enough_info(self):
        client = Client()
        response = client.post('/api/user/signup/', data = json.dumps({
            'user_type': None,
            'email': 'abc@snu.ac.kr',
            'nickname': 'a',
            'password': "b",
            'company_name': "c",
        }), content_type="application/json")
        self.assertEqual(response.status_code, 409)

    def test_signup_else(self):
        client = Client()
        response = client.get('/api/user/signup/')
        self.assertEqual(response.status_code, 405)

#signin    
    def test_signin_post_success(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': 'a',
            'company_name': "c",
        }), content_type="application/json")
        response = client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': 'a',
        }), content_type="application/json")
        user_id = User.objects.filter(email='abc@snu.ac.kr')[0].id
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'id': user_id})

    def test_signin_post_JSONerror(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        response = client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
        }), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_signin_post_not_authenticated(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        response = client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': "k",
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_signin_else(self):
        client = Client()
        response = client.get('/api/user/signin/')
        self.assertEqual(response.status_code, 405)

#signout    
    def test_signout_success(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "abc@snu.ac.kr",
            'password': "d",
        }), content_type="application/json")
        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 204)

    def test_signout_not_authenticated(self):
        client = Client()
        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 401)

    def test_signout_else(self):
        client = Client()
        response = client.delete('/api/user/signout/')
        self.assertEqual(response.status_code, 405)

#user    
    def test_user_get_success(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        response = client.post('/api/user/signin/', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': "d",
        }), content_type="application/json")
        uid = User.objects.get(email = 'abc@snu.ac.kr').id
        response = client.get('/api/user/' + str(uid) + "/")
        self.assertEqual(response.status_code, 200)
    """
    def test_user_get_not_authenticated(self):
        client = Client()
        response = client.get('/api/user/1/')
        self.assertEqual(response.status_code, 401)
    """
    def test_user_get_not_exist(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "abc@snu.ac.kr",
            'password': "d",
        }), content_type="application/json")
        response = client.get('/api/user/100/')
        self.assertEqual(response.status_code, 404)
    
    def test_user_put_EE_success(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'd@snu.ac.kr',
            'nickname': 'k',
            'password': "a",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "d@snu.ac.kr",
            'password': "a",
        }), content_type="application/json")
        url = '/api/user/' + str(User.objects.filter(email='d@snu.ac.kr')[0].id) + "/"
        response = client.put(url, data = json.dumps({
            "password": "c",
            "employee_region": [], 
            "employee_type": ["mentoring"], 
            "employee_how_to_pay": ["pay_hourly", "goods"], 
            "employee_pay_limit": 10000,
            "profile_image": None,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)
    
    def test_user_put_ER_success(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': "abc@snu.ac.kr",
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "abc@snu.ac.kr",
            'password': "d",
        }), content_type="application/json")
        url = '/api/user/' + str(User.objects.filter(email='abc@snu.ac.kr')[0].id) + "/"
        response = client.put(url, data = json.dumps({
            "password": "X",
            "company_name": "A", 
            "company_address": "B", 
            "business_content": "C", 
            "representative_name": "D", 
            "employer_license_number": "E",
            "profile_image": None,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        
    def test_user_put_JSONerror(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'd@snu.ac.kr',
            'nickname': 'k',
            'password': "a",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "d@snu.ac.kr",
            'password': "a",
        }), content_type="application/json")
        url = '/api/user/' + str(User.objects.filter(email='d@snu.ac.kr')[0].id) + "/"
        response = client.put(url, data = json.dumps({
            "password": "X",
            "company_name": "A",
            "business_content": "C", 
            "representative_name": "D", 
            "employer_license_number": "E",
            "profile_image": None,
        }), content_type="application/json")
        self.assertEqual(response.status_code, 400)
    
    def test_user_put_not_authenticated(self):
        client = Client()
        response = client.put('/api/user/1/')
        self.assertEqual(response.status_code, 401)
    
    def test_user_put_not_exist(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "abc@snu.ac.kr",
            'password': "d",
        }), content_type="application/json")
        response = client.put('/api/user/100/')
        self.assertEqual(response.status_code, 404)

    def test_user_put_not_identified(self):
        client = Client()
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'ER',
            'email': 'abc@snu.ac.kr',
            'nickname': 'c',
            'password': "d",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signup/', data = json.dumps({
            'user_type': 'EE',
            'email': 'd@snu.ac.kr',
            'nickname': 'k',
            'password': "a",
            'company_name': "c",
        }), content_type="application/json")
        client.post('/api/user/signin/', data = json.dumps({
            'email': "abc@snu.ac.kr",
            'password': "d",
        }), content_type="application/json")
        url = '/api/user/' + str(User.objects.filter(email='d@snu.ac.kr')[0].id) + "/"
        response = client.put(url)
        self.assertEqual(response.status_code, 403)
    
    def test_user_else(self):
        client = Client()
        response = client.delete('/api/user/1/')
        self.assertEqual(response.status_code, 405)