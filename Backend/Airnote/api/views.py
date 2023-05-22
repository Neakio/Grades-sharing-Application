from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import UserSerializer, CommentSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer


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


class GroupViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GroupSerializer
    queryset = Group.objects.all()


class CommentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()



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
