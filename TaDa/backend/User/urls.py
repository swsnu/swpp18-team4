from django.urls import path
import string
from User import views

urlpatterns = [
    path('email/<str:email>/', views.email, name='email'),
    path('nickname/<str:nickname>/', views.nickname, name='nickname'),
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('<int:uid>/', views.user, name='user'),
    path('token/', views.token, name='token'),
]
