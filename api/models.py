from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    pass 

# Dev Buyer models here
{
    "name" : "Bonobo"
}

# Dev Format models here
{
    "buyer" : "", # choose buyer from dev buyer models
    "format_path" : "",
}
# Dev Color Shade models here
{
    "buyer" : "", # choose buyer from dev buyer models
    "color_shade" : ["Lt/blue", "dark", "brut" ],
}