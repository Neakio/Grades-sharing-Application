from backend.models import User, Semester, UserSemester, Group, GroupModule, Module, ModuleCourse, Grade, Course, CourseTeacher
from rest_framework import serializers

# Create your models here.


class UserSerializer(serializers.ModelSerializer):
    # TODO Validation doit échouer si role pas dans les choices

    class Meta:
        model = User
        fields = '__all__'


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'


class UserSemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSemester
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class GroupModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupModule
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'


class ModuleCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuleCourse
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseTeacher
        fields = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
