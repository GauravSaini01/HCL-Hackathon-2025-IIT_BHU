# accounts/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from datetime import datetime
from bson.objectid import ObjectId

from django.contrib.auth.hashers import make_password, check_password

from .db import get_mongo_db
from .tokens import make_access_token, make_refresh_token, decode_token
from .authentication import JWTAuthentication
from .permission import IsAuthenticated, IsProvider
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ProfileSerializer
)


db = get_mongo_db()
users = db.users
refresh_tokens = db.refresh_tokens
audit_logs = db.audit_logs
goals = db.goals
reminders = db.reminders


# Utility: log IP
def _get_ip(request):
    return request.META.get("REMOTE_ADDR")


# Utility: set refresh cookie
def _set_refresh_cookie(response, token, expires):
    cookie_name = getattr(settings, "JWT_AUTH_COOKIE", "refresh_token")
    secure = getattr(settings, "JWT_AUTH_COOKIE_SECURE", False)
    samesite = getattr(settings, "JWT_AUTH_COOKIE_SAMESITE", "Lax")

    response.set_cookie(
        cookie_name,
        token,
        httponly=True,
        secure=secure,
        samesite=samesite,
        expires=expires
    )
    return response


# ---------------------------------------------------------
# REGISTER API
# ---------------------------------------------------------
class RegisterAPIView(APIView):
    permission_classes = []   # public endpoint

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        email = data["email"].lower()

        if users.find_one({"email": email}):
            return Response({"detail": "Email already registered"}, status=400)

        hashed = make_password(data["password"])

        user_doc = {
            "email": email,
            "password_hash": hashed,
            "role": data["role"],      # patient / provider
            "created_at": datetime.utcnow(),
            "profile": {}
        }

        res = users.insert_one(user_doc)

        audit_logs.insert_one({
            "actor": str(res.inserted_id),
            "action": "register",
            "target": email,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Registration successful"}, status=201)


# ---------------------------------------------------------
# LOGIN API
# ---------------------------------------------------------
class LoginAPIView(APIView):
    permission_classes = []   # public endpoint

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"].lower()
        password = serializer.validated_data["password"]

        user = users.find_one({"email": email})
        if not user or not check_password(password, user.get("password_hash", "")):
            return Response({"detail": "Invalid credentials"}, status=401)

        # Create tokens
        access_token, _, access_exp = make_access_token(user)
        refresh_token, refresh_jti, refresh_exp = make_refresh_token(user)

        # Store refresh token in DB for blacklisting
        refresh_tokens.insert_one({
            "user_id": str(user["_id"]),
            "jti": refresh_jti,
            "token": refresh_token,
            "revoked": False,
            "created_at": datetime.utcnow(),
            "expires_at": refresh_exp
        })

        # Audit log
        audit_logs.insert_one({
            "actor": str(user["_id"]),
            "action": "login",
            "target": user["email"],
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        # Prepare response
        resp = Response({
            "access": access_token,
            "access_expires_at": access_exp.isoformat(),
            "user": {
                "id": str(user["_id"]),
                "email": user["email"],
                "role": user["role"]
            }
        }, status=200)

        # Set refresh cookie
        _set_refresh_cookie(resp, refresh_token, refresh_exp)

        return resp


# ---------------------------------------------------------
# REFRESH TOKEN API
# ---------------------------------------------------------
class RefreshAPIView(APIView):
    permission_classes = []

    def post(self, request):
        cookie_name = settings.JWT_AUTH_COOKIE
        token = request.COOKIES.get(cookie_name)

        if not token:
            return Response({"detail": "Refresh token missing"}, status=401)

        try:
            payload = decode_token(token)
        except Exception:
            return Response({"detail": "Invalid or expired refresh token"}, status=401)

        # Verify DB record
        jti = payload["jti"]
        record = refresh_tokens.find_one({"jti": jti})
        if not record or record["revoked"]:
            return Response({"detail": "Refresh token revoked"}, status=401)

        user = users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            return Response({"detail": "User not found"}, status=401)

        # Revoke old token
        refresh_tokens.update_one(
            {"jti": jti},
            {"$set": {"revoked": True, "revoked_at": datetime.utcnow()}}
        )

        # Issue new tokens
        access_token, _, access_exp = make_access_token(user)
        new_refresh_token, new_refresh_jti, new_refresh_exp = make_refresh_token(user)

        # Store new refresh token
        refresh_tokens.insert_one({
            "user_id": str(user["_id"]),
            "jti": new_refresh_jti,
            "token": new_refresh_token,
            "revoked": False,
            "created_at": datetime.utcnow(),
            "expires_at": new_refresh_exp
        })

        resp = Response({
            "access": access_token,
            "access_expires_at": access_exp.isoformat()
        }, status=200)

        _set_refresh_cookie(resp, new_refresh_token, new_refresh_exp)

        return resp


# ---------------------------------------------------------
# LOGOUT API
# ---------------------------------------------------------
class LogoutAPIView(APIView):
    permission_classes = []

    def post(self, request):
        cookie_name = settings.JWT_AUTH_COOKIE
        token = request.COOKIES.get(cookie_name)

        resp = Response({"detail": "Logged out"}, status=200)

        if token:
            try:
                payload = decode_token(token)
                jti = payload["jti"]

                refresh_tokens.update_one(
                    {"jti": jti},
                    {"$set": {"revoked": True}}
                )
            except:
                pass

            resp.delete_cookie(cookie_name)

        return resp


# ---------------------------------------------------------
# PROFILE API (GET + UPDATE)
# ---------------------------------------------------------
class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = users.find_one(
            {"_id": ObjectId(request.user.id)},
            {"password_hash": 0}
        )
        if not user:
            return Response({"detail": "User not found"}, status=404)

        return Response({
            "id": request.user.id,
            "email": user["email"],
            "role": user["role"],
            "profile": user.get("profile", {})
        })

    def patch(self, request):
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        update = {"profile." + k: v for k, v in serializer.validated_data.items()}

        users.update_one(
            {"_id": ObjectId(request.user.id)},
            {"$set": update}
        )

        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "profile_update",
            "target": request.user.id,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Profile updated"})


# ---------------------------------------------------------
# PROVIDER DASHBOARD
# ---------------------------------------------------------
class ProviderDashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsProvider]

    def get(self, request):
        provider_id = request.user.id

        # Find assigned patients
        patients = list(
            users.find(
                {"role": "patient", "profile.assigned_provider_id": provider_id},
                {"password_hash": 0}
            )
        )

        summaries = []
        for p in patients:
            pid = str(p["_id"])

            goals_count = goals.count_documents({"user_id": pid})
            reminders_count = reminders.count_documents({"user_id": pid, "done": False})

            summaries.append({
                "id": pid,
                "email": p.get("email"),
                "full_name": p.get("profile", {}).get("full_name"),
                "goals_count": goals_count,
                "upcoming_reminders": reminders_count
            })

        return Response({
            "provider_id": provider_id,
            "total_patients": len(patients),
            "patients": summaries
        })
