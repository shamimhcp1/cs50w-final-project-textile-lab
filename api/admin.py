from django.contrib import admin
from . models import Buyer, DevFormat, DevColorShade, DevRequirement, DevReport

# Register your models here.
admin.site.register(Buyer)
admin.site.register(DevFormat)
admin.site.register(DevColorShade)
admin.site.register(DevRequirement)
admin.site.register(DevReport)