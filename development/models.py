import os
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.core.files.storage import default_storage
from django.db.models.signals import pre_delete
from django.dispatch import receiver


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

def format_file_path(instance, filename):
    # Get the buyer's name
    buyer_name = instance.buyer.name if instance.buyer else 'unknown_buyer'
    
    # the path where the file will be stored
    return os.path.join('development', 'static', 'development', 'format', buyer_name, f"{timezone.now().strftime('%Y%m%d%H%M%S')}_{filename}")

class DevFormat(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    format_path = models.FileField(upload_to=format_file_path, blank=True, null=True)
    format_label = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.buyer.name}, {self.format_label}"
    
# Signal to delete associated file when DevFormat instance is deleted
@receiver(pre_delete, sender=DevFormat)
def delete_format_file(sender, instance, **kwargs):
    # Delete the associated file when deleting the entry
    if instance.format_path:
        file_path = instance.format_path.path
        if default_storage.exists(file_path):
            default_storage.delete(file_path)

class DevColorShade(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    color_shade = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.buyer.name}, {self.color_shade}"

class DevRequirement(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    format = models.ForeignKey(DevFormat, on_delete=models.SET_NULL, null=True, blank=True)
    color_shade = models.ForeignKey(DevColorShade, on_delete=models.SET_NULL, null=True, blank=True)
    dry_rubbing = models.CharField(max_length=255, null=True, blank=True)
    wet_rubbing = models.CharField(max_length=255, null=True, blank=True)
    wash_tear_warp = models.CharField(max_length=20, null=True, blank=True)
    wash_tear_weft = models.CharField(max_length=20, null=True, blank=True)
    tensile_warp = models.CharField(max_length=20, null=True, blank=True)
    tensile_weft = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        color_shade = self.color_shade.color_shade if self.color_shade else ""
        return f"{self.buyer.name}, {self.format.format_label}, {color_shade}"

class DevReport(models.Model):
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE)
    format = models.ForeignKey(DevFormat, on_delete=models.CASCADE)
    color_shade = models.ForeignKey(DevColorShade, on_delete=models.CASCADE, null=True, blank=True)
    style = models.CharField(max_length=255)
    color = models.CharField(max_length=50, null=True, blank=True)
    fab_ref = models.CharField(max_length=50)
    fab_supplier = models.CharField(max_length=50, null=True, blank=True)
    sample_type = models.CharField(max_length=50)
    receive_date = models.DateField()
    report_date = models.DateField()
    create_date = models.DateField(default=timezone.now)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
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

    def __str__(self):
        return f"{self.style} - {self.sample_type} - {self.color} - Fabric ref - {self.fab_ref} - Buyer - {self.buyer.name}"