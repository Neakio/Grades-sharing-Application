from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from django.http import JsonResponse
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
        student_id = self.request.query_params.get('student')
        if is_active=="true":
            queryset = Group.objects.filter(is_active=True)
        if is_active=="false":
            queryset = Group.objects.filter(is_active=False)
        if student_id is not None :
            queryset = Group.objects.filter(students__in=[student_id])
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
        queryset = Grade.objects.all()
        id= 3
        user = User.objects.get(id=id)
        print(User.objects.get(id=id))
        role = user.role
        print(role)


        #Return filtered grades according to the role
        match role :
                case "AR" :
                    groups = Group.objects.filter(referent_id=id)
                    modules = Module.objects.filter(groups__in=groups)

                    # Create a dictionary to store the formatted data
                    administrator_data = {
                        'administrator_id': user.id,
                        'administrator_name': user.name,
                        'group': None
                    }

                    # Iterate over each group
                    for group in groups:
                        # Get the related grades for the group and prefetch related fields to avoid additional queries
                        grades = Grade.objects.filter(group=group).select_related('student', 'course')

                        # Create a dictionary for the group's data
                        group_data = {
                            'group_id': group.id,
                            'group_name': group.name,
                            'students': []
                        }

                        # Iterate over each grade
                        for grade in grades:
                            # Create a dictionary for the student's data
                            student_data = {
                                'student_id': grade.student.id,
                                'student_name': grade.student.name,
                                'course_id': grade.course.id,
                                'course_title': grade.course.title,
                                'grade': grade.number,
                                'comment': grade.comment
                            }

                            # Append the student's data to the group's data
                            group_data['students'].append(student_data)

                        # Append the group's data to the administrator's data
                        administrator_data['groups'].append(group_data)

                        queryset=JsonResponse(administrator_data)


                case "TE" :
                    courses = Course.objects.filter(Q(other_teachers__in=[id]) | Q(lead_teacher=id))

                    # Create a dictionary to store the formatted data
                    teacher_data = {
                        'teacher_id': user.id,
                        'teacher_name': user.lastname,
                        'students': []
                    }

                    # Iterate over each course
                    for course in courses:
                        # Get the related grades for the course and prefetch related fields to avoid additional queries
                        grades = Grade.objects.filter(course=course).select_related('student', 'group')

                        # Iterate over each grade
                        for grade in grades:
                            # Create a dictionary for the student's data
                            student_data = {
                                'student_id': grade.student.id,
                                'student_firstname': grade.student.firstname,
                                'student_lastname': grade.student.lastname,
                                'course_id': course.id,
                                'course_title': course.title,
                                'grade': grade.number,
                                'comment': grade.comment
                            }

                            # Get the student's groups and append them to the student's data
                            student_data['groups'] = list(grade.group.students.filter(role='ST').values('id', 'firstname', 'lastname'))

                            # Get the student's courses and append them to the student's data
                            student_data['courses'] = list(Module.objects.filter(groups=grade.group).values('courses__id', 'courses__title'))

                            # Append the student's data to the teacher's data
                            teacher_data['students'].append(student_data)
                    queryset=JsonResponse(teacher_data)

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
        return queryset




        """match role :
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
        return queryset"""

        #Filter by Group
        """group_by = self.request.query_params.get('group_by')
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