# accounts/permissions.py

from rest_framework import permissions


class IsAuthenticated(permissions.BasePermission):
    """Basic check that request.user exists and is_authenticated."""
    def has_permission(self, request, view):
        return bool(getattr(request, "user", None) and getattr(request.user, "is_authenticated", False))


class IsProvider(permissions.BasePermission):
    """Allow access only to users with role == 'provider'."""
    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and getattr(user, "role", None) == "provider")


class IsPatient(permissions.BasePermission):
    """Allow access only to users with role == 'patient'."""
    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and getattr(user, "role", None) == "patient")
