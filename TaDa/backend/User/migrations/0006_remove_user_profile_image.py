# Generated by Django 2.1.2 on 2018-12-16 09:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0005_user_profile_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
    ]