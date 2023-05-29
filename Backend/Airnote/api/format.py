from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from django.db.models import Q

from backend.models import User, Comment, Group, Module, Course, Grade
from .serializers import GradeSerializer

class FormatGrade(viewset.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = GradeSerializer
    def get_queryset(self):
        user = User.objects.get(id=id)
        role = user.role
        match role :
                case "AR" :
                    groups = Group.objects.filter(referent_id=id)
                    students=[]
                    for i in range(len(groups)):
                        students.append(groups[i][students])
                    queryset = Grade.objects.filter(group__in=[groups])


                case "TE" :
                    courses = Course.objects.filter(Q(other_teachers__in=[id]) | Q(lead_teacher=id)).values()
                    courses_ids = []
                    for i in range(len(courses)):
                        courses_ids.append(courses[i]['id'])
                    queryset = Grade.objects.filter(course__in=courses_ids)



                case "ST" : 
                    queryset = Grade.objects.filter(student_id=id)

                case _ :
                    queryset = ""
        return queryset