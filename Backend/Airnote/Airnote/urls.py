"""Airnote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import UserCreateAPIView, UserRetrieveUpdateDestroyAPIView, PasswordResetAPIView, PasswordResetConfirmAPIView, LoginView, LogoutView, GetCSRFToken



urlpatterns = [
    path('admin/doc', include('django.contrib.admindocs.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('users/', UserCreateAPIView.as_view(), name='user-create'),
    path('api/csrf-token/', GetCSRFToken.as_view(), name='csrf-token'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-retrieve-update-destroy'),
    path('api/password-reset/', PasswordResetAPIView.as_view(), name='password-reset'),
    path('api/password-reset/<str:uid>/<str:token>/', PasswordResetConfirmAPIView.as_view(), name='password-reset-confirm'),
]
