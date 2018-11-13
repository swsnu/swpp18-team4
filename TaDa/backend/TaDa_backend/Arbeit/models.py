from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
class Arbeit(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 50, null = True);
    content = models.TextField(null = True);
    region_options = (
        ('School', 'School'),
        ('SNUStation', 'SNUStation'),
        ('Nokdu', 'Nokdu'),
        ('Nakdae', 'Nakdae'),
        ('Extra', 'Extra')
    )
    region = models.CharField(
    	max_length = 20,
        choices=region_options,
        default = 'Extra'
    )
    arbeit_type_options = (
        ('Mentoring', 'Mentoring'),
        ('Tutoring', 'Tutoring'),
        ('Cafe', 'Cafe'),
        ('IT', 'IT'),
        ('Design', 'Design'),
        ('Extra', 'Extra')
    )
    arbeit_type = models.CharField(
    	max_length = 20,
        choices=arbeit_type_options,
        default = 'Extra'
    )
    pay = models.IntegerField(default = 0)
    #time_zone: string[];
    manager_name = models.CharField(max_length = 50, null = True)
    manager_phone = models.CharField(max_length = 50, null = True)
    register_date = models.DateTimeField('date published', null = True)
    edit_date = models.DateTimeField('date edited', null = True)

    def __str__(self):
        return 'id: '+str(self.id)+' title:'+self.title