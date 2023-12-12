import os
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
        ('merchandiser', 'Merchandiser'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)

    # Adding related_name to avoid clashes with the default auth.User model
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set')

    def __str__(self):
        return f"{self.username}, {self.role}"

class Buyer(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class DevRequirement(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.PROTECT)
    requirement_label = models.CharField(max_length=255, unique=True)
    dry_rubbing = models.CharField(max_length=255, null=True, blank=True)
    wet_rubbing = models.CharField(max_length=255, null=True, blank=True)
    rubbing_method = models.CharField(max_length=100, null=True, blank=True)
    rubbing_text = models.CharField(max_length=100, null=True, blank=True)
    wash_tear_warp = models.CharField(max_length=20, null=True, blank=True)
    wash_tear_weft = models.CharField(max_length=20, null=True, blank=True)
    tear_method = models.CharField(max_length=100, null=True, blank=True)
    tear_text = models.CharField(max_length=100, null=True, blank=True)
    tensile_warp = models.CharField(max_length=20, null=True, blank=True)
    tensile_weft = models.CharField(max_length=20, null=True, blank=True)
    tensile_method = models.CharField(max_length=100, null=True, blank=True)
    tensile_text = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.buyer.name}, {self.requirement_label}"

class DevReport(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.PROTECT)
    requirement = models.ForeignKey(DevRequirement, on_delete=models.PROTECT, null=True, blank=True)
    style = models.CharField(max_length=255)
    color = models.CharField(max_length=50, null=True, blank=True)
    fab_ref = models.CharField(max_length=50)
    fab_supplier = models.CharField(max_length=50, null=True, blank=True)
    sample_type = models.CharField(max_length=50)
    receive_date = models.DateField(default=timezone.now)
    report_date = models.DateField(default=timezone.now)
    dry_rubbing = models.CharField(max_length=10, null=True, blank=True)
    wet_rubbing = models.CharField(max_length=10, null=True, blank=True)
    rubbing_comment = models.CharField(max_length=50, null=True, blank=True)
    raw_tear_warp = models.CharField(max_length=20, null=True, blank=True)
    raw_tear_weft = models.CharField(max_length=20, null=True, blank=True)
    wash_tear_warp = models.CharField(max_length=20, null=True, blank=True)
    wash_tear_weft = models.CharField(max_length=20, null=True, blank=True)
    tear_comment = models.CharField(max_length=50, null=True, blank=True)
    tensile_warp = models.CharField(max_length=20, null=True, blank=True)
    tensile_weft = models.CharField(max_length=20, null=True, blank=True)
    tensile_comment = models.CharField(max_length=20, null=True, blank=True)
    result = models.CharField(max_length=50, null=True, blank=True)
    create_date = models.DateField(default=timezone.now)
    create_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return f"{self.style} - {self.sample_type} - {self.color} - Fabric ref - {self.fab_ref} - Buyer - {self.buyer.name}"