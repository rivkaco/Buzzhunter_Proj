# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-06 15:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='itc_user_interaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('current_page', models.CharField(max_length=1000)),
                ('buttons_clicked', models.CharField(max_length=100)),
                ('page_visited', models.CharField(max_length=1000)),
                ('coordinates', models.CharField(max_length=25)),
                ('overall_time', models.CharField(max_length=50)),
                ('date_time_of_access', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]