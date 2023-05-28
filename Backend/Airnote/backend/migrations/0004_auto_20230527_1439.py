# Generated by Django 3.2.18 on 2023-05-27 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_grade_group'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='user',
            new_name='student',
        ),
        migrations.RemoveField(
            model_name='module',
            name='groups',
        ),
        migrations.AddField(
            model_name='group',
            name='modules',
            field=models.ManyToManyField(blank=True, default=[], null=True, related_name='modules', to='backend.Module'),
        ),
        migrations.AlterUniqueTogether(
            name='comment',
            unique_together={('student', 'group')},
        ),
        migrations.AlterUniqueTogether(
            name='grade',
            unique_together={('student', 'group', 'course')},
        ),
    ]