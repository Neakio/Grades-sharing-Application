from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(User)
admin.site.register(Semester)
admin.site.register(UserSemester)
admin.site.register(Group)
admin.site.register(Module)
admin.site.register(Course)
admin.site.register(Grade)
