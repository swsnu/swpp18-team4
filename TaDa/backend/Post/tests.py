from django.test import TestCase, Client
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from json.decoder import JSONDecodeError
import json
from django.shortcuts import get_object_or_404
from django.db import models
from User.models import User, UserManager
from Post.models import Post

# Create your tests here.
"""
class PostTestCase(TestCase):

    def test_posts_get_success(self):
        pass
    
    def test_posts_get_not_authenticated(self):
        pass

    def test_posts_post_success(self):
        pass
    
    def test_posts_post_JSONerror(self):
        pass
    
    def test_posts_post_not_authenticated(self):
        pass
    
    def test_posts_else(self):
        client = Client()
        response = client.put('/api/post/')
        self.assertEqual(response.status_code, 405)
    
    def test_post_get_success(self, post_id):
        pass
    
    def test_post_get_not_authenticated(self, post_id):
        pass

    def test_post_get_not_exist(self, post_id):
        pass

    def test_post_put_success(self, post_id):
        pass
    
    def test_post_put_not_authenticated(self, post_id):
        pass
    
    def test_post_put_not_exist(self, post_id):
        pass
    
    def test_post_put_not_authorized(self, post_id):
        pass
    
    def test_post_put_JSONerror(self, post_id):
        pass
    
    def test_post_delete_success(self, post_id):
        pass
    
    def test_post_delete_not_authenticated(self, post_id):
        pass
    
    def test_post_delete_not_exist(self, post_id):
        pass
    
    def test_post_delete_not_authorized(self, post_id):
        pass
    
    def test_post_else(self, post_id):
        client = Client()
        url = '/api/post/' + str(post_id)
        response = client.post(url)
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

    def test_token_get(self):
        client = Client()
        response = client.get('/api/post/token/')
        self.assertEqual(response.status_code, 204)

    def test_token_else(self):
        client = Client()
        response = client.post('/api/post/token/')
        self.assertEqual(response.status_code, 405)
"""