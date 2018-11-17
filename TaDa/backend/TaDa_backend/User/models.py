from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class TaDa_User(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    employ_choices = (
            ('ER', 'Employer'),
            ('EE', 'Employee'),
    )
    employ_type = models.CharField(max_length = 2, choices = employ_choices)
    last_login = models.DateTimeField(auto_now = True)
    
    def get_employ_type(self):
        return self.employ_type

    def get_last_login(self):
        return self.last_login

class Employee_preference(models.Model):
    employee_id = models.ForeignKey(User, on_delete = models.CASCADE)
    region_choices = (
        ('교내', 'School'),
        ('설입', 'SNUStation'),
        ('녹두', 'Nokdu'),
        ('낙성대', 'Nakdae'),
        ('기타', 'Extra'),
    )
    region = models.CharField(max_length = 50, null = True, choices = region_choices)
    #timezone
    arbeit_type = models.CharField(max_length = 50, null = True)

class Employer_introduction(models.Model):
    employer_id = models.ForeignKey(User, on_delete = models.CASCADE)
    company_name = models.CharField(max_length = 50, null = True)
    company_address = models.CharField(max_length = 100, null = True)
    business_content = models.TextField(null = True)
    representative_name = models.CharField(max_length = 20, null = True)
    representative_phonenumber = models.CharField(max_length = 15, null = True)
    star = models.FloatField(default=0.0, null = True)
