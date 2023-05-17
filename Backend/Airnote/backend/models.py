from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class User(models.Model):
    ROLES = [('AD', 'Administrator'), ('AR', 'Administrator Referent'),
             ('TE', 'Teacher'), ('ST', 'Student')]

    firstname = models.CharField(max_length=50,
                                 blank=False, null=False)
    lastname = models.CharField(max_length=50,
                                blank=False, null=False)
    role = models.CharField(max_length=2, choices=ROLES,
                            blank=False, null=False)
    is_delegate = models.BooleanField(default=False)
    # Ligne SSO
    group = models.ForeignKey(
        'Group', on_delete=models.SET_NULL, blank=True, null=True)


class Semester(models.Model):
    date_tc = models.DateField(
        blank=False, null=False)
    number = models.IntegerField(
        choices=[(1, 'First semester'), (2, 'Second semester')],
        blank=False, null=False)
    group = models.ForeignKey('Group', on_delete=models.CASCADE,
                              blank=False, null=False)

    class Meta:
        unique_together = ('number', 'group', )


class UserSemester(models.Model):
    comment = models.CharField(max_length=200,
                               blank=True, null=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    semester = models.ForeignKey('Semester', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'semester', )


class Group(models.Model):
    GROUPS = [('M2', 'Master 2'), ('M1', 'Master 1'), ('L3', 'Licence')]
    level = models.CharField(max_length=2, choices=GROUPS,
                             blank=False, null=False)
    name = models.CharField(max_length=20,
                            blank=False, null=False)
    year = models.CharField(max_length=9,
                            blank=False, null=False)
    is_active = models.BooleanField(default=True)
    referent = models.ForeignKey('User', limit_choices_to={
        'role': 'AR'}, on_delete=models.PROTECT, related_name='referent', blank=True, null=True)

    class Meta:
        unique_together = ('level', 'name', 'year')


class Course(models.Model):
    title = models.CharField(max_length=100,
                             blank=False, null=False)
    lead_teacher = models.ForeignKey('User', limit_choices_to={
                                     'role': 'TE'}, on_delete=models.PROTECT, related_name='lead_teacher',
                                     blank=False, null=False)
    other_teachers = models.ManyToManyField(User, limit_choices_to={
        'role': 'TE'}, related_name='teachers', default=[])


class Module(models.Model):
    title = models.CharField(max_length=100,
                             blank=False, null=False)
    groups = models.ManyToManyField(Group, blank=True)
    courses = models.ManyToManyField(Course, blank=True)


class Grade(models.Model):
    number = models.DecimalField(max_digits=2, decimal_places=2, validators=[
                                 MinValueValidator(0), MaxValueValidator(25)], blank=True, null=True)
    comment = models.CharField(max_length=200, blank=True, null=True)
    course = models.ForeignKey('Course', on_delete=models.PROTECT,
                               blank=False, null=False)
    student = models.ForeignKey('User', limit_choices_to={
                                'role': 'ST'}, on_delete=models.CASCADE,
                                blank=False, null=False)



