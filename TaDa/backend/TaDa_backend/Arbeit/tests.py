from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from Arbeit.models import Arbeit
import json
from django.utils import timezone

# Create your tests here.

class ArbeitTestCase(TestCase):

    """
    def test_csrf(self):
        # By default, csrf checks are disabled in test client
        # To test csrf protection we enforce csrf checks here
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)  # Request without csrf token returns 403 response

        response = client.get('/api/token')
        csrftoken = response.cookies['csrftoken'].value  # Get csrf token from cookie

        response = client.post('/api/signup', json.dumps({'username': 'chris', 'password': 'chris'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)  # Pass csrf protection
    """

    def test_token_get(self):
        client = Client()
        response = client.get('/api/arbeit/token')
        self.assertEqual(response.status_code, 204)

    def test_token_else(self):
        client = Client()
        response = client.post('/api/arbeit/token')
        self.assertEqual(response.status_code, 405)

    def test_arbeit_list_get(self):
        client = Client()
        response = client.get('/api/arbeit/')
        self.assertEqual(response.status_code, 200)
    
    def test_arbeit_list_post(self):
        client = Client()
        response = client.post('/api/arbeit/', data = json.dumps({
            'title':'a', 
            'content':'a',
            'region':'교내',
            'arbeit_type':'멘토링',
            'pay':100,
            'manager_name':'a',
            'manager_phone':'01012345678',
        }), content_type="application/json")
        self.assertEqual(response.status_code, 201)
    
    def test_arbeit_list_else(self):
        client = Client()
        response = client.delete('/api/arbeit/')
        self.assertEqual(response.status_code, 405)
    
    def test_arbeit_detail_get_404(self):
        client = Client()
        response = client.get('/api/arbeit/1')
        self.assertEqual(response.status_code, 404)
    
    def test_arbeit_detail_get_success(self):
        client = Client()
        response = client.post('/api/arbeit/', data = json.dumps({
            'title':'a', 
            'content':'a',
            'region':'교내',
            'arbeit_type':'멘토링',
            'pay':100,
            'manager_name':'a',
            'manager_phone':'01012345678',
        }), content_type="application/json")
        response = client.get('/api/arbeit/1')
        self.assertEqual(response.status_code, 200)
    
    def test_arbeit_detail_post(self):
        client = Client()
        response = client.post('/api/arbeit/1')
        self.assertEqual(response.status_code, 405)
    
    def test_arbeit_detail_put(self):
        client = Client()
        response = client.post('/api/arbeit/', data = json.dumps({
            'title':'a', 
            'content':'a',
            'region':'교내',
            'arbeit_type':'멘토링',
            'pay':100,
            'manager_name':'a',
            'manager_phone':'01012345678',
        }), content_type="application/json")        
        response = client.put('/api/arbeit/1', data = json.dumps({
            'title':'a', 
            'content':'a',
            'region':'교내',
            'arbeit_type':'멘토링',
            'pay':100,
            'manager_name':'a',
            'manager_phone':'01012345678',
        }), content_type="application/json")
        self.assertEqual(response.status_code, 200)
    
    def test_arbeit_detail_delete(self):
        client = Client()
        response = client.post('/api/arbeit/', data = json.dumps({
            'title':'a', 
            'content':'a',
            'region':'교내',
            'arbeit_type':'멘토링',
            'pay':100,
            'manager_name':'a',
            'manager_phone':'01012345678',
        }), content_type="application/json")
        response = client.delete('/api/arbeit/1')
        self.assertEqual(response.status_code, 200)