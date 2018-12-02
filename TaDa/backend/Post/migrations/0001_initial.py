# Generated by Django 2.1.2 on 2018-12-02 15:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, null=True)),
                ('content', models.TextField(null=True)),
                ('region', models.CharField(max_length=20, null=True)),
                ('region_specific', models.TextField(null=True)),
                ('arbeit_type', models.CharField(max_length=20, null=True)),
                ('how_to_pay', models.CharField(max_length=20, null=True)),
                ('pay_per_hour', models.IntegerField(default=0, null=True)),
                ('goods', models.CharField(max_length=100, null=True)),
                ('register_date', models.DateTimeField(auto_now_add=True, verbose_name='first published date')),
                ('last_modify_date', models.DateTimeField(auto_now=True, verbose_name='last edited date')),
                ('deadline', models.DateTimeField(null=True, verbose_name='deadline')),
                ('home_expect_time', models.IntegerField(default=0, null=True)),
                ('is_magam_user', models.BooleanField(default=False)),
                ('is_magam_timeout', models.BooleanField(default=False)),
                ('is_same_person', models.BooleanField(default=False)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
