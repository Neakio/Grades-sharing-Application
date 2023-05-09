# Generated by Django 3.2.18 on 2023-05-09 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20230509_0651'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='other_teachers',
            field=models.ManyToManyField(blank=True, limit_choices_to={'role': 'TE'}, related_name='teachers', to='backend.User'),
        ),
    ]
