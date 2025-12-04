# accounts/views_provider.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson.objectid import ObjectId
from datetime import datetime

from .authentication import JWTAuthentication
from .permission import IsAuthenticated, IsProvider
from .db import get_mongo_db
from .serializers import ProfileSerializer

db = get_mongo_db()
users = db.users
goals = db.goals
reminders = db.reminders
audit_logs = db.audit_logs


def _get_ip(request):
    return request.META.get("REMOTE_ADDR")


class ProviderDashboardView(APIView):
    """
    GET: basic provider dashboard listing patients assigned to this provider and summary counts.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsProvider]

    def get(self, request):
        provider_id = request.user.id

        # find patients assigned to this provider
        patients_cursor = users.find(
            {"role": "patient", "profile.assigned_provider_id": provider_id},
            {"password_hash": 0}
        )

        patients = list(patients_cursor)

        patient_summaries = []
        for p in patients:
            pid = str(p["_id"])
            goals_count = goals.count_documents({"user_id": pid})
            upcoming_reminders = reminders.count_documents({"user_id": pid, "done": False})
            patient_summaries.append({
                "id": pid,
                "email": p.get("email"),
                "full_name": p.get("profile", {}).get("full_name"),
                "goals_count": goals_count,
                "upcoming_reminders": upcoming_reminders
            })

        data = {
            "provider_id": provider_id,
            "total_patients": len(patient_summaries),
            "patients": patient_summaries
        }
        return Response(data, status=status.HTTP_200_OK)


class AssignPatientView(APIView):
    """
    Assign or unassign a patient to a provider.
    POST / assign: { "patient_id": "<id>" }
    DELETE / unassign: { "patient_id": "<id>" }
    Provider can assign patients to themselves. Optionally an admin flow can be added later.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsProvider]

    def post(self, request):
        patient_id = request.data.get("patient_id")
        if not patient_id:
            return Response({"detail": "patient_id required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # ensure patient exists and is role patient
            patient = users.find_one({"_id": ObjectId(patient_id), "role": "patient"})
        except Exception:
            return Response({"detail": "Invalid patient_id"}, status=status.HTTP_400_BAD_REQUEST)

        if not patient:
            return Response({"detail": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        provider_id = request.user.id

        users.update_one(
            {"_id": ObjectId(patient_id)},
            {"$set": {"profile.assigned_provider_id": provider_id}}
        )

        audit_logs.insert_one({
            "actor": provider_id,
            "action": "assign_patient",
            "target": patient_id,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Patient assigned"}, status=status.HTTP_200_OK)

    def delete(self, request):
        patient_id = request.data.get("patient_id")
        if not patient_id:
            return Response({"detail": "patient_id required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            patient = users.find_one({"_id": ObjectId(patient_id), "role": "patient"})
        except Exception:
            return Response({"detail": "Invalid patient_id"}, status=status.HTTP_400_BAD_REQUEST)

        if not patient:
            return Response({"detail": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        provider_id = request.user.id

        # Only remove assignment if this provider is currently assigned (safety)
        if patient.get("profile", {}).get("assigned_provider_id") != provider_id:
            return Response({"detail": "You are not assigned to this patient"}, status=status.HTTP_403_FORBIDDEN)

        users.update_one(
            {"_id": ObjectId(patient_id)},
            {"$unset": {"profile.assigned_provider_id": ""}}
        )

        audit_logs.insert_one({
            "actor": provider_id,
            "action": "unassign_patient",
            "target": patient_id,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Patient unassigned"}, status=status.HTTP_200_OK)
