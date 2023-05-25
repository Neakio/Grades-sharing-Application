from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from django.db.models import Q

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
    def get_queryset(self):
        queryset = Group.objects.all()
        is_active = self.request.query_params.get('is_active')
        if is_active=="true":
            queryset = Group.objects.filter(is_active=True)
        if is_active=="false":
            queryset = Group.objects.filter(is_active=False)
        return queryset
    



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
    def get_queryset(self):
        queryset = Course.objects.all()
        teacher_id = self.request.query_params.get('teacher')
        if teacher_id is not None:
            queryset = Course.objects.filter(Q(other_teachers__in=[teacher_id]) | Q(lead_teacher=teacher_id))
        return queryset


class GradeViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GradeSerializer
    
    def get_queryset(self):
        queryset = Grade.objects.all()
        id = 6
        user = User.objects.get(id=id)
        role = user.role

        group_by = self.request.query_params.get('group_by')
        if group_by is not None and group_by=="module" : 
            courses=[]
            for grade in queryset.values() :
                print("Grades : ", grade) 
                if grade["course_id"] not in courses:
                    courses.append(grade["course_id"])
                    print("courses : ", courses) 
            modules = Module.objects.filter(courses__in=courses)
            print("modules : ", modules.values()) 
            for module in modules.values():
                print("module : ", module) 
                module["grades"] = Grade.objects.filter(course__in=module["courses"])
            print(modules.values())
            return modules

        #Return filtered grades according to the role
        match role :
            case "AR" :
                groups = Group.objects.filter(referent_id=id).prefetch_related('students').values()
                print(Group.objects.prefetch_related('students__firstname').values())
                Group.objects.prefetch_related("students")
                students = []
                for group in groups:
                    students += group['students']
                queryset = Grade.objects.filter(student__in=students)

            case "TE" :
                courses = Course.objects.filter(Q(other_teachers__in=[id]) | Q(lead_teacher=id)).values()
                courses_ids = []
                for i in range(len(courses)):
                    courses_ids.append(courses[i]['id'])
                queryset = Grade.objects.filter(course__in=courses_ids)

            case _ : 
                queryset = Grade.objects.filter(student_id=id)
        return queryset
