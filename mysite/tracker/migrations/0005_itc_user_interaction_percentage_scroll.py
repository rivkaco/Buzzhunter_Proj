# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-03-19 11:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0004_auto_20170316_1342'),
    ]

    operations = [
        migrations.AddField(
            model_name='itc_user_interaction',
            name='percentage_scroll',
            field=models.CharField(default='No Scroll', max_length=100),
        ),
    ]