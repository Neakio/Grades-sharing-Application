from rest_framework import viewsets
from django.db.models import Q

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import UserSerializer, CommentSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from rest_framework import generics, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, PasswordResetSerializer
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie

class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class PasswordResetAPIView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.get(username=serializer.validated_data['username'])

        # Generate token and create reset URL
        token_generator = default_token_generator
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        current_site = get_current_site(request)
        reset_url = f"{current_site}/password-reset/{uid}/{token}"
        return reset_url

class PasswordResetConfirmAPIView(APIView):
    def post(self, request, uid, token):
        try:
            uid = force_text(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        token_generator = default_token_generator
        if user is not None and token_generator.check_token(user, token):
            # Set new password
            user.set_password(request.data.get('new_password'))
            user.save()
            return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_protect, name="dispatch")
class LoginView(View):
    @method_decorator(csrf_protect)
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)

class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({'message': 'Logout successful'})


"""Send to the login interface the token CSRF as a cookie."""
@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        return Response({'success':'CSRF cookie sets'})

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
    