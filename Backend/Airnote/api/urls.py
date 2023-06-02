from django.contrib import admin
from django.urls import path
from .views import *

from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'users', UserViewSet, basename='User')
router.register(r'comments', CommentViewSet, basename='Comment')
router.register(r'groups', GroupViewSet, basename='Group')
router.register(r'modules', ModuleViewSet, basename='Module')
router.register(r'courses', CourseViewSet, basename='Course')
router.register(r'grades', GradeViewSet, basename='Grade')


urlpatterns = router.urls