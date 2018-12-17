from django.db import models
from django.conf import settings
from django_mysql.models import EnumField, ListCharField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.serializers.json import DjangoJSONEncoder
import datetime

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, user_type, email, nickname = None,  password = None, company_name = None, company_address= None):
        if not email:
            raise ValueError("User must have an email")
        if not user_type:
            raise ValueError("User must have an user_type")
        user = self.model(
            user_type = user_type,
            email = self.normalize_email(email),
            nickname = nickname, 
            company_name = company_name,
            company_address = company_address
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password, user_type, company_name = None, company_address= None, nickname = None):
        user = self.create_user(
            user_type = user_type,
            password = password,
            email = self.normalize_email(email),
            nickname = nickname,
            company_name = company_name,
        )
        user.is_active = True
        user.is_admin = True
        user.save(using=self._db)
        return user
    
class User(AbstractBaseUser):
    user_type = EnumField(choices=['EE', 'ER'])
    email = models.EmailField(verbose_name='email address', max_length=100, unique=True, db_index=True)
    nickname = models.CharField(max_length=50, unique=True, null=True)
    employee_region = ListCharField(
        base_field = models.CharField(max_length=10),
        size = 5,
        max_length = (5 * 11),
        null = True
    ) #choices=['seoulip', 'nakdae', 'nokdu', 'snu', 'home',], null=True)
    employee_type = ListCharField(
        base_field = models.CharField(max_length=25),
        size = 11,
        max_length = (11 * 26),
        null = True
    ) # choices=['work_scholarship_student', 'mentoring', 'experiment_arbeit', 'private_lesson', 'academy', 'survey', 'lecture', 'service', 'typing', 'outsourcing', 'extra'], null=True)
    employee_how_to_pay = ListCharField(
        base_field = models.CharField(max_length=15),
        size = 5,
        max_length = (5 * 16),
        null = True
    ) #choices=['pay_hourly', 'pay_per_work', 'goods', 'random', 'uncertain'], null=True
    employee_pay_limit = models.PositiveIntegerField(null=True)
    company_name = models.CharField(max_length=100, null=True)
    company_address = models.CharField(max_length=200, null=True)
    business_content = models.TextField(null=True)
    representative_name = models.CharField(max_length=50, null=True)
    employer_license_number = models.CharField(max_length=20, null=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELD = ['user_type']

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app 'app_label'?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
