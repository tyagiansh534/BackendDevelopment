import logging
import requests

logger = logging.getLogger(__name__)

def get_external_data(student_id: int):
    """
    Fetches external student profile data with timeout handling and logging.
    """
    url = f"https://api.example.com/students/{student_id}"
    try:
        logger.info(f"Fetching external data for student {student_id}")
        response = requests.get(url, timeout=3.0)
        response.raise_for_status()
        return {"data": response.json(), "error": None}
    except requests.exceptions.Timeout:
        logger.warning(f"Timeout occurred while querying external API for student {student_id}")
        return {"data": None, "error": "External service timed out"}
    except requests.exceptions.RequestException as e:
        logger.error(f"External API error: {e}")
        return {"data": None, "error": str(e)}
