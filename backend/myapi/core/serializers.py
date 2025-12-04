# accounts/serializers.py (append)

from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.CharField()
    email = serializers.EmailField()
    role = serializers.CharField()
    profile = serializers.DictField(child=serializers.CharField(), required=False)

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=8)
