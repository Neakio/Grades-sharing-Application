from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.



class UserManager(BaseUserManager):
    def create_user(self, username, firstname, lastname, password):
        if not firstname:
            raise ValueError("The First Name field must be set.")
        if not lastname:
            raise ValueError("The Last Name field must be set.")
        user = self.model(username, firstname=firstname, lastname=lastname)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, username, firstname, lastname, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            username,
            firstname,
            lastname,
            password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user



# Add the manager to the User model

class User(AbstractBaseUser):
  # Existing fields
    ROLES = [
        ('AD', 'Administrator'),
        ('AR', 'Administrator Referent'),
        ('TE', 'Teacher'),
        ('ST', 'Student')
    ]
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=50, blank=False, null=False)
    lastname = models.CharField(max_length=50, blank=False, null=False)
    username = models.CharField(max_length=50, unique=True, blank=False, null=False)
    password = models.CharField(max_length=50, blank=False, null=False)
    role = models.CharField(max_length=2, choices=ROLES, blank=False, null=False)
    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    



class Course(models.Model):
    title = models.CharField(max_length=100,
                             blank=False, null=False)
    lead_teacher = models.ForeignKey('User', limit_choices_to={
                                     'role': 'TE'}, on_delete=models.PROTECT, related_name='lead_teacher',
                                     blank=False, null=False)
    other_teachers = models.ManyToManyField(User, limit_choices_to={
        'role': 'TE'}, related_name='teachers', default=[], blank=True)


class Module(models.Model):
    title = models.CharField(max_length=100,
                             blank=False, null=False)
    courses = models.ManyToManyField(
        Course, related_name='courses', default=[], blank=True)


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
    delegates = models.ManyToManyField('User', limit_choices_to={
        'role': 'ST'}, related_name='delegates', default=[], blank=True)
    students = models.ManyToManyField('User', limit_choices_to={
        'role': 'ST'}, related_name='students', default=[], blank=True)
    modules = models.ManyToManyField('Module', related_name='modules', default=[], blank=True)

    class Meta:
        unique_together = ('level', 'name', 'year')


class Comment(models.Model):
    comment = models.CharField(max_length=200,
                               blank=True, null=True)
    student = models.ForeignKey('User', on_delete=models.CASCADE)
    group = models.ForeignKey('Group', on_delete=models.CASCADE,
                              blank=False, null=False)

    class Meta:
        unique_together = ('student', 'group', )

  

class Grade(models.Model):
    number = models.DecimalField(max_digits=4, decimal_places=2, validators=[
                                 MinValueValidator(0), MaxValueValidator(25)], blank=True, null=True)
    comment = models.CharField(max_length=200, blank=True, null=True)
    course = models.ForeignKey('Course', on_delete=models.PROTECT,
                               blank=False, null=False)
    student = models.ForeignKey('User', limit_choices_to={
                                'role': 'ST'}, on_delete=models.CASCADE,
                                blank=False, null=False)
    group = models.ForeignKey('Group', on_delete=models.PROTECT,
                                blank=False, null=False)

    class Meta:
        unique_together = ('student', 'group', 'course', )