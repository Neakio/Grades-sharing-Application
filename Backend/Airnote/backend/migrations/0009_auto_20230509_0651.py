# Generated by Django 3.2.18 on 2023-05-09 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_rename_others_teachers_course_other_teachers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='modules',
        ),
        migrations.AddField(
            model_name='module',
            name='courses',
            field=models.ManyToManyField(blank=True, null=True, to='backend.Course'),
        ),
    ]