from django.db import models
from django.contrib.auth.models import User, BaseUserManager, AbstractBaseUser
# Create your models here.

class TaDa_UserManager(BaseUserManager):
    def create_user(self, email, employ_type, name, last_login, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email = self.normalize_email(email),
            employ_type = employ_type,
            name = name,
            last_login = last_login,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class TaDa_User(AbstractBaseUser):    
    email = models.EmailField(verbose_name = 'email address', unique = True)
    password = models.CharField(max_length = 20)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELD = ['employ_type', 'name', 'last_login']

    employ_choices = (
            ('ER', 'Employer'),
            ('EE', 'Employee')
    )
    employ_type = models.CharField(max_length = 2, choices = employ_choices)
    name = models.CharField(max_length = 20)
    last_login = models.DateTimeField(auto_now = True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = TaDa_UserManager()

    def __str__(self):
        return self.email
    
    def get_employ_type(self):
        return self.employ_type

    def get_name(self):
        return self.name
    
    def get_last_login(self):
        return self.last_login

class Employee_preference(models.Model):
    employee_id = models.ForeignKey(TaDa_User, on_delete = models.CASCADE)
    region = models.CharField(max_length = 50, null = True) #choices?
    #timezone
    arbeit_type = models.CharField(max_length = 50, null = True)

class Employer_introduction(models.Model):
    employer_id = models.ForeignKey(TaDa_User, on_delete = models.CASCADE)
    company_name = models.CharField(max_length = 50, null = True)
    company_address = models.CharField(max_length = 100, null = True)
    business_content = models.TextField(null = True)
    representative_name = models.CharField(max_length = 20, null = True)
    representative_phonenumber = models.CharField(max_length = 15, null = True)
