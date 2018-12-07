from django.db import models
from User.models import User
from Post.models import Post
import datetime

# Create your models here.
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE, db_index=True)
    refer_comment = models.IntegerField(null = True)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    star = models.FloatField(null = True)
    content = models.TextField(null = True)
    register_date = models.DateTimeField('first published date', auto_now_add = True)
    last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)

    def __str__(self):
        return 'id: '+ str(self.id)

