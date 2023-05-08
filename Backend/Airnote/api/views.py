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
        groupId = self.request.query_params.get('groupId')
        if groupId is not None:
            queryset = User.objects.filter(group=groupId)
        if role is not None:
            queryset = User.objects.filter(role=role, group=groupId)
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
    queryset = Module.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class GradeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GradeSerializer
    queryset = Grade.objects.all()
