from django.urls import path
from Post import views

urlpatterns = [
    path('', views.posts, name='posts'),
    path('<int:post_id>/', views.post, name='post'),
    path('author/<int:author_id>/', views.author, name='author'),
    path('alarm/', views.alarm, name='alarm'),
    path('token/', views.token, name='token'),
]

