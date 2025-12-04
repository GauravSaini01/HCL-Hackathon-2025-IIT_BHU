# accounts/tokens.py

import jwt
import uuid
from datetime import datetime, timedelta
from django.conf import settings

# Algorithm & secret
ALGORITHM = "HS256"
SECRET = settings.SECRET_KEY

# Lifetimes (settings expose timedelta objects)
ACCESS_LIFETIME = getattr(settings, "ACCESS_TOKEN_LIFETIME", timedelta(minutes=15))
REFRESH_LIFETIME = getattr(settings, "REFRESH_TOKEN_LIFETIME", timedelta(days=7))


def _now_ts():
    return datetime.utcnow()


def make_access_token(user_doc):
    """
    Returns (token_str, jti, exp_datetime)
    user_doc: dict-like document from MongoDB (must include _id, email, role)
    """
    jti = str(uuid.uuid4())
    exp = _now_ts() + ACCESS_LIFETIME
    payload = {
        "sub": str(user_doc["_id"]),
        "email": user_doc.get("email"),
        "role": user_doc.get("role"),
        "jti": jti,
        "iat": _now_ts(),
        "exp": exp
    }
    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    # PyJWT returns str in v2, bytes in some versions; ensure str
    if isinstance(token, bytes):
        token = token.decode()
    return token, jti, exp


def make_refresh_token(user_doc):
    """
    Returns (token_str, jti, exp_datetime)
    """
    jti = str(uuid.uuid4())
    exp = _now_ts() + REFRESH_LIFETIME
    payload = {
        "sub": str(user_doc["_id"]),
        "email": user_doc.get("email"),
        "role": user_doc.get("role"),
        "jti": jti,
        "iat": _now_ts(),
        "exp": exp
    }
    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    if isinstance(token, bytes):
        token = token.decode()
    return token, jti, exp


def decode_token(token):
    """
    Decode token and return payload. Raises jwt exceptions on invalid/expired.
    """
    payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
    return payload
