from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets

from backend.models import User, Semester, UserSemester, Group, GroupModule, Module, ModuleCourse, Course, CourseTeacher, Grade
from .serializers import UserSerializer, SemesterSerializer, UserSemesterSerializer, GroupSerializer, GroupModuleSerializer, ModuleSerializer, ModuleCourseSerializer, CourseSerializer, CourseTeacherSerializer, GradeSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role')
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


class GroupModuleViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GroupModuleSerializer
    queryset = GroupModule.objects.all()


class ModuleViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ModuleSerializer
    queryset = Module.objects.all()


class ModuleCourseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = ModuleCourseSerializer
    queryset = ModuleCourse.objects.all()


class CourseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class CourseTeacherViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = CourseTeacherSerializer
    queryset = CourseTeacher.objects.all()


class GradeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GradeSerializer
    queryset = Grade.objects.all()


""" @api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if(serializer.is_valid()):
        serializer.save()
    return Response(serializer.data) """
