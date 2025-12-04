# accounts/views_reminders.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson.objectid import ObjectId
from datetime import datetime

from .authentication import JWTAuthentication
from .permission import IsAuthenticated, IsProvider, IsPatient
from .serializers import ReminderCreateSerializer, ReminderUpdateSerializer
from .db import get_mongo_db


# Mongo DB Collections
db = get_mongo_db()
reminders = db.reminders
audit_logs = db.audit_logs


# -------------------------- UTIL ----------------------------- #
def _get_ip(request):
    return request.META.get("REMOTE_ADDR")


# --------------------------------------------------------------
# LIST + CREATE REMINDERS
# --------------------------------------------------------------
class ReminderListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsPatient]

    def get(self, request):
        """
        List all reminders for logged-in patient.
        """
        user_id = request.user.id

        docs = list(
            reminders.find({"user_id": user_id}).sort("remind_at", 1)
        )

        for r in docs:
            r["id"] = str(r["_id"])
            r.pop("_id", None)

        return Response(docs, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new preventive reminder.
        """
        serializer = ReminderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        reminder_doc = {
            "user_id": request.user.id,
            "title": data["title"],
            "message": data.get("message", ""),
            "remind_at": data["remind_at"],
            "repeat": data.get("repeat", "none"),   # none/daily/weekly/monthly
            "done": False,
            "created_at": datetime.utcnow()
        }

        result = reminders.insert_one(reminder_doc)

        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "create_reminder",
            "target": str(result.inserted_id),
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)


# --------------------------------------------------------------
# RETRIEVE + UPDATE + DELETE REMINDER
# --------------------------------------------------------------
class ReminderRetrieveUpdateDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsPatient]

    def _get_reminder(self, reminder_id):
        try:
            return reminders.find_one({"_id": ObjectId(reminder_id)})
        except Exception:
            return None

    def get(self, request, pk):
        """
        Get a specific reminder.
        """
        reminder = self._get_reminder(pk)
        if not reminder:
            return Response({"detail": "Reminder not found"}, status=404)

        if reminder["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=403)

        reminder["id"] = str(reminder["_id"])
        reminder.pop("_id", None)

        return Response(reminder, status=200)

    def patch(self, request, pk):
        """
        Update reminder fields.
        """
        reminder = self._get_reminder(pk)
        if not reminder:
            return Response({"detail": "Reminder not found"}, status=404)

        if reminder["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=403)

        serializer = ReminderUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        update_data = serializer.validated_data
        update_data["updated_at"] = datetime.utcnow()

        reminders.update_one(
            {"_id": ObjectId(pk)},
            {"$set": update_data}
        )

        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "update_reminder",
            "target": pk,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Reminder updated"}, status=200)

    def delete(self, request, pk):
        """
        Delete a reminder.
        """
        reminder = self._get_reminder(pk)
        if not reminder:
            return Response({"detail": "Reminder not found"}, status=404)

        if reminder["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=403)

        reminders.delete_one({"_id": ObjectId(pk)})

        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "delete_reminder",
            "target": pk,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Reminder deleted"}, status=200)


# --------------------------------------------------------------
# MARK REMINDER AS DONE
# --------------------------------------------------------------
class ReminderMarkDoneView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsPatient]

    def post(self, request, pk):
        """
        Mark a reminder as completed.
        """
        try:
            reminder = reminders.find_one({"_id": ObjectId(pk)})
        except Exception:
            reminder = None

        if not reminder:
            return Response({"detail": "Reminder not found"}, status=404)

        if reminder["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=403)

        reminders.update_one(
            {"_id": ObjectId(pk)},
            {"$set": {"done": True, "done_at": datetime.utcnow()}}
        )

        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "mark_reminder_done",
            "target": pk,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Marked as done"}, status=200)
