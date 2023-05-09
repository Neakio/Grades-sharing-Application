# Generated by Django 3.2.18 on 2023-05-09 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_alter_course_other_teachers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='other_teachers',
            field=models.ManyToManyField(blank=True, limit_choices_to={'role': 'TE'}, null=True, related_name='teachers', to='backend.User'),
        ),
    ]