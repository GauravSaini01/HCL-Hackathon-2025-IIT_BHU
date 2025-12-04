# accounts/views_goals.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from bson.objectid import ObjectId
from datetime import datetime

from .authentication import JWTAuthentication
from .permission import IsAuthenticated, IsProvider, IsPatient
from .serializers import GoalCreateSerializer, GoalUpdateSerializer
from .db import get_mongo_db


# DB references
db = get_mongo_db()
goals = db.goals
audit_logs = db.audit_logs


# Utility — get client IP
def _get_ip(request):
    return request.META.get("REMOTE_ADDR")


# --------------------------------------------------------
# Goals List + Create
# --------------------------------------------------------
class GoalListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsPatient]

    def get(self, request):
        """
        List all goals for the logged-in patient.
        """
        user_id = request.user.id

        docs = list(goals.find({"user_id": user_id}).sort("created_at", -1))

        # Convert ObjectId to string
        for g in docs:
            g["id"] = str(g["_id"])
            g.pop("_id", None)

        return Response(docs, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new goal for the patient.
        """
        serializer = GoalCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        goal_doc = {
            "title": data["title"],
            "description": data.get("description", ""),
            "target_date": data.get("target_date"),
            "completed": False,
            "user_id": request.user.id,
            "created_at": datetime.utcnow()
        }

        result = goals.insert_one(goal_doc)

        # Audit log
        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "create_goal",
            "target": str(result.inserted_id),
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)


# --------------------------------------------------------
# Goal Retrieve + Update + Delete
# --------------------------------------------------------
class GoalRetrieveUpdateDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsPatient]

    def _get_goal(self, pk):
        try:
            return goals.find_one({"_id": ObjectId(pk)})
        except Exception:
            return None

    def get(self, request, pk):
        """
        Retrieve a single goal by ID.
        """
        goal = self._get_goal(pk)
        if not goal:
            return Response({"detail": "Goal not found"}, status=status.HTTP_404_NOT_FOUND)

        # prevent accessing another patient's goal
        if goal["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        goal["id"] = str(goal["_id"])
        goal.pop("_id", None)

        return Response(goal, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        """
        Update goal attributes.
        """
        goal = self._get_goal(pk)
        if not goal:
            return Response({"detail": "Goal not found"}, status=status.HTTP_404_NOT_FOUND)

        if goal["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        serializer = GoalUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        update_fields = serializer.validated_data
        update_fields["updated_at"] = datetime.utcnow()

        goals.update_one(
            {"_id": ObjectId(pk)},
            {"$set": update_fields}
        )

        # Audit log
        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "update_goal",
            "target": pk,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Goal updated"}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        """
        Delete a goal.
        """
        goal = self._get_goal(pk)
        if not goal:
            return Response({"detail": "Goal not found"}, status=status.HTTP_404_NOT_FOUND)

        if goal["user_id"] != request.user.id:
            return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        goals.delete_one({"_id": ObjectId(pk)})

        # Audit log
        audit_logs.insert_one({
            "actor": request.user.id,
            "action": "delete_goal",
            "target": pk,
            "ip": _get_ip(request),
            "ts": datetime.utcnow()
        })

        return Response({"detail": "Goal deleted"}, status=status.HTTP_200_OK)

