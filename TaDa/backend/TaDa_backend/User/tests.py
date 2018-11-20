from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from Arbeit.models import Arbeit
import json
from django.utils import timezone

# Create your tests here.

class UserTestCase(TestCase):

    def test_token_get(self):
        client = Client()
        response = client.get('/api/user/token')
        self.assertEqual(response.status_code, 204)

    def test_token_else(self):
        client = Client()
        response = client.post('/api/user/token')
        self.assertEqual(response.status_code, 405)
    
    def test_signup_post_success(self):
        client = Client()
        response = client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'a',
            'last_name': 'b',
            'password': "c",
            'employ_type': 'EE'
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)
    
    def test_signup_post_fail(self):
        client = Client()
        client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'a',
            'last_name': 'b',
            'password': "c",
            'employ_type': 'EE'
        }), content_type="application/json")
        response = client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'c',
            'last_name': 'd',
            'password': "e",
            'employ_type': 'ER'
        }), content_type="application/json")
        self.assertEqual(response.status_code, 409)

    def test_signup_else(self):
        client = Client()
        response = client.get('/api/user/signup')
        self.assertEqual(response.status_code, 405)

    def test_authenticate_email_success(self):
        client = Client()
        response = client.get('/api/user/authenticate/abc@snu.ac.kr')
        self.assertEqual(response.status_code, 200)
    
    def test_authenticate_email_fail(self):
        client = Client()
        client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'a',
            'last_name': 'b',
            'password': "c",
            'employ_type': 'EE'
        }), content_type="application/json")
        response = client.get('/api/user/authenticate/abc@snu.ac.kr')
        self.assertEqual(response.status_code, 409)
    
    def test_authenticate_email_else(self):
        client = Client()
        response = client.delete('/api/user/authenticate/abc@snu.ac.kr')
        self.assertEqual(response.status_code, 405)

    def test_signin_success(self):
        client = Client()
        client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'a',
            'last_name': 'b',
            'password': "faifnaifna",
            'employ_type': 'EE'
        }), content_type="application/json")
        response = client.post('/api/user/signin', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': "faifnaifna"
        }), content_type="application/json")
        self.assertEqual(response.status_code, 204)
    
    def test_signin_fail(self):
        client = Client()
        client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'a',
            'last_name': 'b',
            'password': "dbcfafaeeaf",
            'employ_type': 'EE'
        }), content_type="application/json")
        response = client.post('/api/user/signin', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'password': "dbcfafaeea",
        }), content_type="application/json")
        self.assertEqual(response.status_code, 401)
    
    def test_signin_else(self):
        client = Client()
        response = client.get('/api/user/signin')
        self.assertEqual(response.status_code, 405)
    
    def test_signout_success(self):
        client = Client()
        client.post('/api/user/signup', data = json.dumps({
            'email': 'abc@snu.ac.kr',
            'first_name': 'a',
            'last_name': 'b',
            'password': "faifjaoifja",
            'employ_type': 'EE'
        }), content_type="application/json")
        client.post('/api/user/signin', data = json.dumps({
            'email': "abc@snu.ac.kr",
            'password': "faifjaoifja"
        }), content_type="application/json")
        response = client.get('/api/user/signout')
        self.assertEqual(response.status_code, 204)
    
    def test_signout_fail(self):
        client = Client()
        response = client.get('/api/user/signout')
        self.assertEqual(response.status_code, 401)
    
    def test_signout_else(self):
        client = Client()
        response = client.delete('/api/user/signout')
        self.assertEqual(response.status_code, 405)