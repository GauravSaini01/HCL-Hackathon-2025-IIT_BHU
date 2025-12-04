# apps/api/models.py (only if you don't already have AuditLog/User)
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    ROLE_CHOICES = (('patient','Patient'), ('provider','Provider'), ('admin','Admin'))
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')

    class Meta:
        db_table = 'users'

class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    ip_address = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'audit_logs'
