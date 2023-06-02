from rest_framework import viewsets, generics, status
from django.db.models import Q

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import UserSerializer, CommentSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer
from .serializers import UserSerializer


from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.authtoken.models import Token


class UserLoginViewSet(generics.CreateAPIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            login(request,user)
            token, _ =Token.objects.get_or_create(user=user)
            return Response({'token':token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        

class UserLogoutViewSet(generics.DestroyAPIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

@method_decorator(csrf_exempt, name="dispatch")
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


@method_decorator(csrf_exempt, name="dispatch")
class GroupViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing group instances.
    """
    serializer_class = GroupSerializer
    def get_queryset(self):
        queryset = Group.objects.all()
        is_active = self.request.query_params.get('is_active')
        student_id = self.request.query_params.get('student')
        courses = self.request.query_params.get('courses')
        referent = self.request.query_params.get('referent')
        if is_active=="true":
            queryset = queryset.filter(is_active=True)
        if is_active=="false":
            queryset = queryset.filter(is_active=False)
        if student_id is not None :
            queryset = queryset.filter(students__in=[student_id])
        if courses is not None:
            queryset = queryset.filter(modules__courses__in=courses)
        if referent is not None:
            queryset = queryset.filter(referent=referent)
        return queryset
    

@method_decorator(csrf_exempt, name="dispatch")
class CommentViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing comment instances.
    """
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        queryset = Comment.objects.all()
        student_id = self.request.query_params.get('student')
        group_id = self.request.query_params.get('group')
        if student_id is not None and group_id is not None:
            queryset = Comment.objects.filter(student_id=student_id, group_id=group_id)
        return queryset

    


@method_decorator(csrf_exempt, name="dispatch")
class ModuleViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing modules instances.
    """
    serializer_class = ModuleSerializer
    def get_queryset(self):
        queryset = Module.objects.all()
        group_id=self.request.query_params.get('group')
        if group_id is not None:
            queryset = Module.objects.filter(groups__in=[group_id])
        return queryset


@method_decorator(csrf_exempt, name="dispatch")
class CourseViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing courses instances.
    """
    serializer_class = CourseSerializer
    def get_queryset(self):
        queryset = Course.objects.all()
        teacher_id = self.request.query_params.get('teacher')
        if teacher_id is not None:
            queryset = Course.objects.filter(Q(other_teachers__in=[teacher_id]) | Q(lead_teacher=teacher_id))
        return queryset


@method_decorator(csrf_exempt, name="dispatch")
class GradeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing grades instances.
    """
    serializer_class = GradeSerializer
    
    def get_queryset(self):
        student_id = self.request.query_params.get('student')
        group_id = self.request.query_params.get('group')
        course_id = self.request.query_params.get('course')
        if course_id is not None and group_id is not None:
            queryset = Grade.objects.filter(group_id=group_id, course_id=course_id)
        if student_id is not None:
            queryset = Grade.objects.filter(student=student_id)
        return queryset
    