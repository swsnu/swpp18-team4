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
        pass

    def test_comments_post_not_authenticated(self):
        pass

    def test_comments_post_JSONerror(self):
        pass

    def test_comments_else(self):
        pass 
    
    def test_comment_get_success(self):
        pass
    
    def test_comment_get_not_exist(self):
        pass
    
    def test_comment_put_success(self):
        pass
    
    def test_comment_put_not_authenticated(self):
        pass
    
    def test_comment_put_not_exist(self):
        pass
    
    def test_comment_put_not_authorized(self):
        pass
    
    def test_comment_put_JSONerror(self):
        pass
    
    def test_comment_delete_success(self):
        pass
    
    def test_comment_delete_not_authenticated(self):
        pass
    
    def test_comment_delete_not_exist(self):
        pass
    
    def test_comment_delete_not_authorized(self):
        pass
