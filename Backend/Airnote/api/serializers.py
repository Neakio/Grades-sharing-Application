from backend.models import User, Semester, UserSemester, Group, Module, Grade, Course
from rest_framework import serializers

# Create your models here.


class GroupField(serializers.RelatedField):
    def to_representation(self, value):
        print(value)
        group = {
            'id': value.id,
            'level': value.level,
            'name': value.name,
            'year': value.year,
        }
        return group


class UserSerializer(serializers.ModelSerializer):
    # TODO Validation doit échouer si role pas dans les choices
    # Custom GroupField because of circular dependency between User and Group
    group = GroupField(read_only=True)

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
    referent = UserSerializer(required=False, allow_null=True)

    class Meta:
        model = Group
        fields = '__all__'


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    #? lead_teacher = UserSerializer(required=True, allow_null=False)
    #? other_teachers = UserSerializer(many=True, required=False,  allow_null=True)

    class Meta:
        model = Course
        fields = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
