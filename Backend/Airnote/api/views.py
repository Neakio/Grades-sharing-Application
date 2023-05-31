from rest_framework import viewsets
from django.db.models import Q

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import UserSerializer, CommentSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer



class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    





class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserLoginView(TokenObtainPairView):
    pass

User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    authentication_classes = [JWTAuthentication]
    user = request.user
    serialized_user = UserSerializer(user)  # Assuming you have a UserSerializer defined
    return Response(serialized_user.data)


