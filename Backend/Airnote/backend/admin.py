from django.contrib import admin

# Register your models here.
from .models import User
from .models import Semester
from .models import UserSemester
from .models import Group
from .models import Module
from .models import Course
from .models import Grade

admin.site.register(User)
admin.site.register(Semester)
admin.site.register(UserSemester)
admin.site.register(Group)
admin.site.register(Module)
admin.site.register(Course)
admin.site.register(Grade)
