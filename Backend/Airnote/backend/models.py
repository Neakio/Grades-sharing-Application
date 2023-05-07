from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class User(models.Model):
    ROLES = [('AD', 'Administrator'), ('AR', 'Administrator Referent'),
             ('TE', 'Teacher'), ('ST', 'Student')]

    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    role = models.CharField(max_length=2, choices=ROLES,
                            blank=False, null=False)
    is_delegate = models.BooleanField(default=False)
    # Ligne SSO
    group = models.ForeignKey(
        'Group', on_delete=models.SET_NULL, blank=True, null=True)


class Semester(models.Model):
    date_tc = models.DateField
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
    level = models.CharField(max_length=2, choices=GROUPS)
    name = models.CharField(max_length=20)
    year = models.CharField(max_length=9)
    is_active = models.BooleanField(default=True)
    referent = models.ForeignKey('User', limit_choices_to={
        'role': 'AR'}, on_delete=models.PROTECT, related_name='referent')

    class Meta:
        unique_together = ('level', 'name', 'year')


class Module(models.Model):
    title = models.CharField(max_length=100)
    groups = models.ManyToManyField(Group, blank=True, null=True)


class Course(models.Model):
    title = models.CharField(max_length=100)
    lead_teacher = models.ForeignKey('User', limit_choices_to={
                                     'role': 'TE'}, on_delete=models.PROTECT, related_name='lead_teacher')
    modules = models.ManyToManyField(Module)
    teachers = models.ManyToManyField(User, limit_choices_to={
        'role': 'TE'}, related_name='teachers')


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
