from django.contrib import admin
from django.urls import path
from .views import UserViewSet

from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)

urlpatterns = router.urls

"""  [
    path('users', views.getUsers),
    path('users', views.createUser)
]
 """