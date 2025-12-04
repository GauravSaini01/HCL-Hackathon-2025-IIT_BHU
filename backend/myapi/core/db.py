# accounts/db.py

from pymongo import MongoClient
from django.conf import settings

"""
This module provides a single MongoDB database connection
shared across the entire Django project.

It loads:
    - settings.MONGO_URI
    - settings.MONGO_DBNAME

Then initializes:
    client = MongoClient(...)
    db = client[db_name]

Use:
    from .db import get_mongo_db
    db = get_mongo_db()
    users = db.users
"""

_client = None
_db = None


def get_mongo_db():
    """
    Returns a global MongoDB database instance.
    Ensures only one MongoClient is created (Singleton pattern).
    """
    global _client, _db

    if _client is None:
        # Connect to MongoDB using Django settings
        mongo_uri = settings.MONGO_URI
        db_name = settings.MONGO_DBNAME

        _client = MongoClient(mongo_uri)
        _db = _client[db_name]

    return _db
