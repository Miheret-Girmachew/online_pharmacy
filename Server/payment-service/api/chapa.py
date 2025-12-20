import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class ChapaMixin:
    """
    Helper class for interacting with Chapa API
    """
    BASE_URL = "https://api.chapa.co/v1"

    def __init__(self):
        self.secret_key = settings.CHAPA_SECRET_KEY
        if not self.secret_key:
            logger.warning("CHAPA_SECRET_KEY is not set.")
        
        self.headers = {
            "Authorization": f"Bearer {self.secret_key}",
            "Content-Type": "application/json"
        }

    def initialize_transaction(self, email, amount, tx_ref, first_name, last_name, return_url, callback_url=None, customization=None):
        """
        Initialize a transaction with Chapa
        """
        url = f"{self.BASE_URL}/transaction/initialize"
        payload = {
            "email": email,
            "amount": str(amount),
            "currency": "ETB",
            "first_name": first_name,
            "last_name": last_name,
            "tx_ref": tx_ref,
            "return_url": return_url,
        }
        
        if callback_url:
            payload["callback_url"] = callback_url
        if customization:
            payload["customization"] = customization

        try:
            response = requests.post(url, json=payload, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Chapa Initialize Error: {str(e)}")
            if e.response:
                logger.error(f"Response: {e.response.text}")
            return {"status": "failed", "message": str(e)}

    def verify_transaction(self, tx_ref):
        """
        Verify a transaction by reference
        """
        url = f"{self.BASE_URL}/transaction/verify/{tx_ref}"
        try:
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Chapa Verify Error: {str(e)}")
            return {"status": "failed", "message": str(e)}
