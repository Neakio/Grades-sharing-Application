# Generated by Django 3.2.18 on 2023-05-28 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_auto_20230527_1439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='modules',
            field=models.ManyToManyField(blank=True, default=[], related_name='modules', to='backend.Module'),
        ),
    ]