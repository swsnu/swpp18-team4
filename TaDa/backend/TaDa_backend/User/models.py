from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class User(models.Model):
    Employ_choices = (
            ('ER', 'Employer'),
            ('EE', 'Employee')
    )
    Employ_type = models.CharField(max_length = 2, choices = Employ_choices)
    email = models.EmailField(unique = True)
    password = models.CharField(max_length = 20)
    name = models.CharField(max_length = 20)
    last_login = models.DateTimeField(auto_now = True)

class Employee_preference(models.Model):
    employee_id = models.ForeignKey(User, on_delete = models.CASCADE)
    region = models.CharField(max_length = 50, null = True) #choices?
    #timezone
    arbeit_type = models.CharField(max_length = 50, null = True)

class Employer_introduction(models.Model):
    employer_id = models.ForeignKey(User, on_delete = models.CASCADE)
    company_name = models.CharField(max_length = 50, null = True)
    company_address = models.CharField(max_length = 100, null = True)
    business_content = models.TextField(null = True)
    representative_name = models.CharField(max_length = 20, null = True)
    representative_phonenumber = models.CharField(max_length = 15, null = True)
