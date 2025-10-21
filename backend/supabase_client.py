import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def fetch_all_data():
    """Fetches all data from the aqi_readings table."""
    try:
        response = supabase.table('aqi_readings').select("*").execute()
        return response.data
    except Exception as e:
        print(f"An error occurred fetching all data: {e}")
        return None

def fetch_city_data(city):
    """Fetches data for a specific city from the aqi_readings table."""
    try:
        response = supabase.table('aqi_readings').select("*").eq('city', city).execute()
        return response.data
    except Exception as e:
        print(f"An error occurred fetching data for {city}: {e}")
        return None