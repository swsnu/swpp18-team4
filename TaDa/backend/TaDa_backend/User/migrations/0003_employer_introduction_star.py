# Generated by Django 2.1.2 on 2018-11-14 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_auto_20181113_2325'),
    ]

    operations = [
        migrations.AddField(
            model_name='employer_introduction',
            name='star',
            field=models.FloatField(default=0.0, null=True),
        ),
    ]
