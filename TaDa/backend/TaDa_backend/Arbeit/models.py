from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Arbeit(models.Model):
    #author = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 50, null = True)
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
        choices=region_options,
        default = 'Extra'
    )
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
        choices=arbeit_type_options,
        default = 'Extra'
    )
    pay = models.IntegerField(default = 0)
    #time_zone: string[]
    manager_name = models.CharField(max_length = 50, null = True)
    manager_phone = models.CharField(max_length = 50, null = True)
    register_date = models.DateTimeField('date published', null = True)
    edit_date = models.DateTimeField('date edited', null = True)

    def __str__(self):
        return 'id: '+str(self.id)+' title:'+self.title