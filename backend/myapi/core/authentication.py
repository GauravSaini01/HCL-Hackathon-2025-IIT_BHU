# accounts/authentication.py

from rest_framework import authentication, exceptions
from .tokens import decode_token
from .db import get_mongo_db
from bson.objectid import ObjectId


db = get_mongo_db()
users = db.users


class JWTAuthentication(authentication.BaseAuthentication):
    """
    DRF authentication class that validates access JWT from Authorization header.
    Returns a lightweight user object with attributes used by permission checks.
    """

    def authenticate(self, request):
        header = authentication.get_authorization_header(request).split()
        if not header or header[0].lower() != b"bearer":
            return None  # no credentials provided

        if len(header) == 1:
            raise exceptions.AuthenticationFailed("Invalid token header. No credentials provided.")
        if len(header) > 2:
            raise exceptions.AuthenticationFailed("Invalid token header. Token string should not contain spaces.")

        token = header[1].decode()

        try:
            payload = decode_token(token)
        except Exception as exc:
            raise exceptions.AuthenticationFailed("Invalid or expired token.")

        user_id = payload.get("sub")
        if not user_id:
            raise exceptions.AuthenticationFailed("Invalid token payload (no sub).")

        try:
            user_doc = users.find_one({"_id": ObjectId(user_id)})
        except Exception:
            raise exceptions.AuthenticationFailed("User not found.")

        if not user_doc:
            raise exceptions.AuthenticationFailed("User not found.")

        # lightweight object to satisfy DRF expectations
        class SimpleUser:
            def __init__(self, doc):
                self.id = str(doc["_id"])
                self.email = doc.get("email")
                self.role = doc.get("role")
                self.raw = doc
                self.is_authenticated = True

            def __str__(self):
                return self.email or self.id

        return (SimpleUser(user_doc), token)
