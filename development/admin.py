from django.contrib import admin
from . models import User, DevReport, Buyer, DevColorShade, DevFormat, DevRequirement

# Register your models here.
admin.site.register(User)
admin.site.register(Buyer)
admin.site.register(DevFormat)
admin.site.register(DevColorShade)
admin.site.register(DevRequirement)
admin.site.register(DevReport)