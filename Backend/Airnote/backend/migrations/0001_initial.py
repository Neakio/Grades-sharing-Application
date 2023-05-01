# Generated by Django 3.2.18 on 2023-05-01 14:51

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(choices=[('M2', 'Master 2'), ('M1', 'Master 1'), ('L3', 'Licence')], max_length=2)),
                ('year', models.CharField(max_length=9)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField(choices=[(1, 'First semester'), (2, 'Second semester')])),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.group')),
            ],
            options={
                'unique_together': {('number', 'group')},
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('role', models.CharField(choices=[('AD', 'Administrator'), ('AR', 'Administrator Referent'), ('TE', 'Teacher'), ('ST', 'Student')], max_length=2)),
                ('is_delegate', models.BooleanField(default=False)),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='backend.group')),
            ],
        ),
        migrations.AddField(
            model_name='group',
            name='referent',
            field=models.ForeignKey(limit_choices_to={'role': 'AR'}, on_delete=django.db.models.deletion.PROTECT, related_name='referent', to='backend.user'),
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.DecimalField(decimal_places=2, max_digits=2, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(25)])),
                ('comment', models.CharField(max_length=200)),
                ('exam_date', models.DateField(default=None, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='backend.course')),
                ('student', models.ForeignKey(limit_choices_to={'role': 'ST'}, on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='lead_teacher',
            field=models.ForeignKey(limit_choices_to={'role': 'TE'}, on_delete=django.db.models.deletion.PROTECT, to='backend.user'),
        ),
        migrations.CreateModel(
            name='UserSemester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=200)),
                ('semester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.semester')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
            options={
                'unique_together': {('user', 'semester')},
            },
        ),
        migrations.CreateModel(
            name='ModuleCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.course')),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.module')),
            ],
            options={
                'unique_together': {('module', 'course')},
            },
        ),
        migrations.CreateModel(
            name='GroupModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.group')),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.module')),
            ],
            options={
                'unique_together': {('group', 'module')},
            },
        ),
        migrations.AlterUniqueTogether(
            name='group',
            unique_together={('title', 'year')},
        ),
        migrations.CreateModel(
            name='CourseTeacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.course')),
                ('teacher', models.ForeignKey(limit_choices_to={'role': 'TE'}, on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
            options={
                'unique_together': {('teacher', 'course')},
            },
        ),
    ]
