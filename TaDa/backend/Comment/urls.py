from django.urls import path
from Comment import views

urlpatterns = [
    path('', views.comments, name='comments'),
    path('<int:comment_id>', views.comment, name='comment'),
    path('post/<int:post_id>', views.commentByPost, name='commentByPost'),
    path('author/<int:author_id>', views.commentByAuthor, name='commentByAuthor'),
    path('receive/<int:author_id>', views.commentReceive, bame='commentReceive'),
    path('token', views.token, name='token'),
]

