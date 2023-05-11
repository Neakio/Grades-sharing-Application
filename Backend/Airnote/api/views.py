from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets

from backend.models import User, Semester, UserSemester, Group, Module, Course, Grade
from .serializers import UserSerializer, SemesterSerializer, UserSemesterSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role')
        group_id = self.request.query_params.get('group_id')
        if group_id is not None:
            queryset = User.objects.filter(group_id=group_id)
        if role is not None:
            queryset = User.objects.filter(role=role)
        return queryset


class SemesterViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = SemesterSerializer
    queryset = Semester.objects.all()


class UserSemesterViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSemesterSerializer
    queryset = UserSemester.objects.all()


class GroupViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GroupSerializer
    queryset = Group.objects.all()


class ModuleViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ModuleSerializer
    queryset = Module.objects.all().values()


class CourseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CourseSerializer
    print(Course.objects.all().values())

    queryset = Course.objects.all()


class GradeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GradeSerializer
    queryset = Grade.objects.all()
