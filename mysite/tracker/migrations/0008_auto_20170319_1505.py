# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-03-19 13:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0007_auto_20170319_1458'),
    ]

    operations = [
        migrations.AddField(
            model_name='itc_user_interaction',
            name='user_email',
            field=models.CharField(default='Email', max_length=100),
        ),
        migrations.AddField(
            model_name='itc_user_interaction',
            name='user_name',
            field=models.CharField(default='User', max_length=100),
        ),
    ]