# accounts/views_profile.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson.objectid import ObjectId
from datetime import datetime

from .authentication import JWTAuthentication
from .permission import IsAuthenticated
from .serializers import ProfileSerializer
from .db import get_mongo_db

db = get_mongo_db()
users = db.users
audit_logs = db.audit_logs


def _get_ip(request):
    return request.META.get("REMOTE_ADDR")


class ProfileView(APIView):
    """
    GET: return authenticated user's profile
    PATCH: partial update for profile fields
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        uid = request.user.id
        try:
            user_doc = users.find_one({"_id": ObjectId(uid)}, {"password_hash": 0})
        except Exception:
            return Response({"detail": "Invalid user id"}, status=status.HTTP_400_BAD_REQUEST)

        if not user_doc:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "id": uid,
            "email": user_doc.get("email"),
            "role": user_doc.get("role"),
            "profile": user_doc.get("profile", {})
        }, status=status.HTTP_200_OK)

    def patch(self, request):
        uid = request.user.id
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        update = {"profile." + k: v for k, v in serializer.validated_data.items()}

        try:
            users.update_one({"_id": ObjectId(uid)}, {"$set": update})
        except Exception:
            return Response({"detail": "Update failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        audit_logs.insert_one({
            "actor": uid,
            "action": "profile_update",
            "target": uid,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Profile updated"}, status=status.HTTP_200_OK)
