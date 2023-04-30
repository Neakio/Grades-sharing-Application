from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class User(models.Model):
    ROLES = [('AD', 'Administrator'), ('AR', 'Administrator Referent'),
             ('TE', 'Teacher'), ('ST', 'Student'), ('NO', 'None')]

    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    role = models.CharField(max_length=2, choices=ROLES, default='NO')
    is_deleguate = models.BooleanField(default=False)
    # Ligne SSO
    group = models.ForeignKey(
        'Group', on_delete=models.PROTECT, blank=True, null=True)


class Semester(models.Model):
    date_CdC = models.DateField
    number = models.IntegerField(
        choices=[(1, 'First semester'), (2, 'Second semester')])
    group = models.ForeignKey('Group', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('number', 'group', )


class UserSemester(models.Model):
    comment = models.CharField(max_length=200)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    semester = models.ForeignKey('Semester', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'semester', )


class Group(models.Model):
    GROUPS = [('M2', 'Master 2'), ('M1', 'Master 1'), ('L3', 'Licence')]
    title = models.CharField(max_length=2, choices=GROUPS)
    year = models.CharField(max_length=9)
    referent = models.ForeignKey('User', limit_choices_to={
                                 'role': 'AR'}, on_delete=models.PROTECT, related_name='referent')

    class Meta:
        unique_together = ('title', 'year', )


class GroupModule(models.Model):
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    module = models.ForeignKey('Module', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('group', 'module', )


class Module(models.Model):
    title = models.CharField(max_length=100)


class ModuleCourse(models.Model):
    module = models.ForeignKey('Module', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('module', 'course', )


class Course(models.Model):
    title = models.CharField(max_length=100)
    lead_teacher = models.ForeignKey('User', limit_choices_to={
                                     'role': 'TE'}, on_delete=models.PROTECT)


class CourseTeacher(models.Model):
    teacher = models.ForeignKey('User', limit_choices_to={
                                'role': 'TE'}, on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('teacher', 'course', )


class Grade(models.Model):
    number = models.DecimalField(max_digits=2, decimal_places=2, validators=[
                                 MinValueValidator(0), MaxValueValidator(25)])
    comment = models.CharField(max_length=200)
    exam_date = models.DateField(default=None, null=True)
    course = models.ForeignKey('Course', on_delete=models.PROTECT)
    student = models.ForeignKey('User', limit_choices_to={
                                'role': 'ST'}, on_delete=models.CASCADE)


"""
class Info(models.Model):
    Author = models.ForeignKey('User', on_delete=models.CASCADE)
    Group = models.ForeignKey('Group', on_delete=models.CASCADE)
    Title = models.CharField(max_length=50)
    Text = models.CharField(max_length=250)

class Exam
    Title = models.CharField(max_length=20)
    Course = models.ForeignKey('Course', on_delete=models.CASCADE)
    Group = models.ForeignKey('Group', on_delete=models.CASCADE)
    Date = models.DateField
"""
