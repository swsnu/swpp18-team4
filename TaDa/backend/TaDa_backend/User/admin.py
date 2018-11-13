from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from User.models import TaDa_User, Employee_preference, Employer_introduction

# Register your models here.
admin.site.register(TaDa_User)
admin.site.register(Employee_preference)
admin.site.register(Employer_introduction)