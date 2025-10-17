"""
supabase_client.py

Reusable singleton Supabase client. Loads credentials from environment variables.
"""

import os
from dotenv import load_dotenv
from supabase import create_client, Client
from typing import Optional

# Load environment variables from .env (if present)
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "SUPABASE_URL and SUPABASE_KEY must be set in environment variables or .env file."
    )

# Create a single client instance to be reused across the app
_supabase_client: Optional[Client] = None


def get_supabase_client() -> Client:
    """
    Returns a singleton Supabase client instance.
    """
    global _supabase_client
    if _supabase_client is None:
        _supabase_client = create_client(SUPABASE_URL, SUPABASE_KEY)
    return _supabase_client


# Exported instance for convenience (import as: from supabase_client import supabase)
supabase = get_supabase_client()
