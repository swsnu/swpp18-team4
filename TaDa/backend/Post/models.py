from django.db import models
from User.models import User
from django_mysql.models import EnumField, ListCharField
import datetime

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 100, null = True)
    content = models.TextField(null = True)
    region = models.CharField(max_length = 20, null = True)
    region_specific = models.TextField(null = True)
    arbeit_type = models.CharField(max_length = 20, null = True)    
    how_to_pay = models.CharField(max_length = 20,null = True)
    pay_per_hour = models.IntegerField(default = 0, null = True)
    goods = models.CharField(max_length = 100, null = True)
    timezone = ListCharField(
        base_field = models.CharField(max_length=30),
        size = 20,
        max_length = (20 * 31),
        null = True
    )
    register_date = models.DateTimeField('first published date', auto_now_add = True)
    last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
    deadline = models.DateTimeField('deadline', null = True)
    home_expect_time = models.IntegerField(default = 0, null = True)
    is_magam_user = models.BooleanField(default = False)
    is_magam_timeout = models.BooleanField(default = False)
    is_same_person = models.BooleanField(default = False)

    def __str__(self):
        return 'id: '+ str(self.id)

