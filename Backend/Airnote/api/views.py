from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from django.http import JsonResponse
from django.db.models import Q

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import UserSerializer, CommentSerializer, GroupSerializer, ModuleSerializer, CourseSerializer, GradeSerializer

import json

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
    A viewset for viewing and editing user instances.
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
    A viewset for viewing and editing user instances.
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
        student_id = self.request.query_params.get('student')
        group_id = self.request.query_params.get('group')
        course_id = self.request.query_params.get('course')
        if course_id is not None and group_id is not None:
            queryset = Grade.objects.filter(group_id=group_id, course_id=course_id)
        if student_id is not None:
            queryset = Grade.objects.filter(student=student_id)
        return queryset

        #Return filtered grades according to the role
"""        match role :
                case "AR" :
                    groups = Group.objects.filter(referent_id=id)

                    


                case "TE" :
                    courses = Course.objects.filter(Q(other_teachers__in=[id]) | Q(lead_teacher=id))
                    course_serializer = CourseSerializer(courses, many=True)
                    formatted_data = []
                    for course in courses.values():
                        formatted_course = course
                        print(course, "\n")
                        modules = Module.objects.filter(courses__in=courses)
                        module_serializer = ModuleSerializer(modules, many=True)
                        groups = Group.objects.filter(modules__in=modules)
                        group_serializer = GroupSerializer(groups, many=True)
                        groups_data = json.dumps(group_serializer.data)
                        for group in group_serializer.data:
                            group.pop('modules')
                            print(group)
                        formatted_course['groups'] = json.dumps(groups_data)
                        courses_json = json.dumps(course_serializer.data)
                        modules_json = json.dumps(module_serializer.data)
                        groups_json = json.dumps(group_serializer.data)
                        print("\n", formatted_course)
                        #print("courses", courses_json)
                        #print("modules", modules_json)
                        #print("groups", groups_json)
                        #formatted_data.append()
                        return JsonResponse(formatted_course)



                case "ST" : 
                    group_data = []
                    for group in user.groups.all():
                        group_courses = []
                        for course in group.courses.all():
                            grade = Grade.objects.filter(course=course, student=user, group=group).first()
                            course_data = {
                                'title': course.title,
                                'grade': grade.number if grade else None,
                                'comment': grade.comment if grade else None,
                            }
                            group_courses.append(course_data)

                        group_data.append({
                            'group_name': group.name,
                            'courses': group_courses,
                        })

                    return JsonResponse({'student': user.name, 'groups': group_data})
                case _ :
                    queryset = ""
match role :
            case "AR" :
                groups = Group.objects.filter(referent_id=id)
                queryset = Grade.objects.filter(group__in=[groups])

            case "TE" :
                courses = Course.objects.filter(Q(other_teachers__in=[id]) | Q(lead_teacher=id)).values()
                courses_ids = []
                for i in range(len(courses)):
                    courses_ids.append(courses[i]['id'])
                queryset = Grade.objects.filter(course__in=courses_ids)

            case _ : 
                queryset = Grade.objects.filter(student_id=id)
        return queryset

        #Filter by Group
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
            return modules"""