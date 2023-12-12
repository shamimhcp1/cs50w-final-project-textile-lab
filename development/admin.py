from django.contrib import admin
from . models import User, DevReport, Buyer, DevRequirement

# Register your models here.
admin.site.register(User)
admin.site.register(Buyer)
admin.site.register(DevRequirement)
admin.site.register(DevReport)