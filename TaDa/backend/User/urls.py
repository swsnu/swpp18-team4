from django.urls import path
import string
from User import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    #path('validate/<str:email>', views.validate, name='authenticate'),
    #path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<activate_token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.activate, name='activate'),
    path('<int:uid>/', views.user, name='user'),
    path('token/', views.token, name='token'),
]
