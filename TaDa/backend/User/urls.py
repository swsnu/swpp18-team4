from django.urls import path
from User import views

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('signin', views.signin, name='signin'),
    path('signout', views.signout, name='signout'),
    path('validate/<string:email>', views.validate, name='authenticate'),
    path('<int:id>', views.user, name='user'),
    path('token', views.token, name='token'),
]
