from django.contrib import admin
from django.urls import path
from .views import UserViewSet, SemesterViewSet, GroupViewSet, ModuleViewSet, CourseViewSet, GradeViewSet

from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet, basename='User')
router.register(r'semesters', SemesterViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'modules', ModuleViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'grades', GradeViewSet)

urlpatterns = router.urls
