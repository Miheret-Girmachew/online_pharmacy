import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class ServiceIntegrator:
    @staticmethod
    def validate_user_token(token):
        """
        Verify user token with Auth Service
        """
        if not settings.AUTH_SERVICE_URL:
            logger.warning("AUTH_SERVICE_URL not set, skipping validation")
            return True
            
        try:
            response = requests.get(
                f"{settings.AUTH_SERVICE_URL}/verify",
                headers={"Authorization": f"Bearer {token}"}
            )
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Auth Service Error: {e}")
            return False

    @staticmethod
    def notify_inventory_success(order_id):
        """
        Notify Inventory Service to finalize stock
        """
        if not settings.INVENTORY_SERVICE_URL:
            return
            
        try:
            requests.post(f"{settings.INVENTORY_SERVICE_URL}/inventory/lock", json={"order_id": order_id})
            # This is a simplification based on user request "Inventory Service converts Hold to Sold"
        except Exception as e:
            logger.error(f"Inventory Service Error: {e}")

    @staticmethod
    def notify_inventory_failure(order_id, reason):
        """
        Notify Inventory Service to release stock
        """
        if not settings.INVENTORY_SERVICE_URL:
            return
            
        try:
            requests.post(f"{settings.INVENTORY_SERVICE_URL}/inventory/release", json={"order_id": order_id, "reason": reason})
        except Exception as e:
            logger.error(f"Inventory Service Error: {e}")
