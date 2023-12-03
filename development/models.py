from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    ROLE_CHOICES = [
        ('manager', 'Manager'),
        ('incharge', 'Incharge'),
        ('coordinator', 'Coordinator'),
        ('technician', 'Technician'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Addong related_name to avoid clashes with the default auth.User model
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set')

    def __str__(self):
        return f"{self.username}, {self.role}"

class Buyer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class DevFormat(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    format_path = models.URLField(blank=True, null=True)
    format_label = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.buyer.name}, {self.format_label}"

class DevColorShade(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    color_shade = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.buyer.name}, {self.color_shade}"

class DevRequirement(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    format = models.ForeignKey(DevFormat, on_delete=models.SET_NULL, null=True, blank=True)
    color_shade = models.ForeignKey(DevColorShade, on_delete=models.SET_NULL, null=True, blank=True)
    dry_rubbing = models.CharField(max_length=100, null=True, blank=True)
    wet_rubbing = models.CharField(max_length=100, null=True, blank=True)
    wash_tear_warp = models.CharField(max_length=5, null=True, blank=True)
    wash_tear_weft = models.CharField(max_length=5, null=True, blank=True)
    tensile_warp = models.CharField(max_length=5, null=True, blank=True)
    tensile_weft = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
        return f"{self.buyer.name}, {self.format.format_label}, {self.color_shade.color_shade}"

class DevReport(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE)
    format = models.ForeignKey(DevFormat, on_delete=models.CASCADE)
    color_shade = models.ForeignKey(DevColorShade, on_delete=models.CASCADE, null=True, blank=True)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=20, null=True, blank=True)
    fab_ref = models.CharField(max_length=20)
    fab_supplier = models.CharField(max_length=50, null=True, blank=True)
    sample_type = models.CharField(max_length=20)
    receive_date = models.DateField()
    report_date = models.DateField()
    create_date = models.DateField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    dry_rubbing = models.CharField(max_length=5, null=True, blank=True)
    wet_rubbing = models.CharField(max_length=5, null=True, blank=True)
    rubbing_comment = models.CharField(max_length=20, default="N/A")
    raw_tear_warp = models.CharField(max_length=20, null=True, blank=True)
    raw_tear_weft = models.CharField(max_length=20, null=True, blank=True)
    wash_tear_warp = models.CharField(max_length=20, null=True, blank=True)
    wash_tear_weft = models.CharField(max_length=20, null=True, blank=True)
    tear_comment = models.CharField(max_length=20, default="N/A")
    tensile_warp = models.CharField(max_length=20, null=True, blank=True)
    tensile_weft = models.CharField(max_length=20, null=True, blank=True)
    tensile_comment = models.CharField(max_length=20, default="N/A")
    result = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.style} - {self.sample_type} - {self.color} - Fabric ref - {self.fab_ref} - Buyer - {self.buyer.name}"