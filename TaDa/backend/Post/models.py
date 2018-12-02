from django.db import models
from User.models import User
import datetime

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 100, null = True)
    content = models.TextField(null = True)
    region_options = (
        ('교내', 'School'),
        ('설입', 'SNUStation'),
        ('녹두', 'Nokdu'),
        ('낙성대', 'Nakdae'),
        ('기타', 'Extra')
    )
    region = models.CharField(
        max_length = 20,
        choices = region_options,
        default = 'Extra'
    )
    region_specific = models.TextField(null = True)
    arbeit_type_options = (
        ('멘토링', 'Mentoring'),
        ('과외', 'Tutoring'),
        ('카페', 'Cafe'),
        ('IT', 'IT'),
        ('디자인 알바', 'Design'),
        ('기타', 'Extra')
    )
    arbeit_type = models.CharField(
        max_length = 20,
        choices = arbeit_type_options,
        default = 'Extra'
    )
    how_to_pay_options = models.CharField(
    )    
    how_to_pay = models.CharField(
        max_length = 20,
        choices = how_to_pay_options,
        default = 'Extra'
    )
    pay_per_hour = models.IntegerField(default = 0, null = True)
    goods = models.CharField(null = True)
    timezone = models.ArrayField()
    #manager_name = models.CharField(max_length = 50, null = True)
    #manager_phone = models.CharField(max_length = 50, null = True)
    register_date = models.DateTimeField('first published date', auto_now_add = True)
    last_modify_date = models.DateTimeField('last edited date', auto_now = True, blank = True)
    deadline = models.DateTimeField('deadline', null = True)
    home_expect_time = models.IntegerField(default = 0, null = True)
    is_magam_user = models.BooleanField(default = False)
    is_magam_timeout = models.BooleanField(default = False)
    is_same_person = models.BooleanField(default = False)

    def __str__(self):
        return 'id: '+str(self.id)+' title:'+self.title

