from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

class TransactionStatus(models.TextChoices):
    CREATED = "Created", "CREATED"
    PENDING = "Pending", "PENDING"
    SUCCESS = "Success", "SUCCESS"
    FAILED = "Failed", "FAILED"
    REFUNDED = "Refunded", "REFUNDED"

class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(max_length=255)  # ID from Auth Service
    
    # Financials
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=25, default="ETB")
    
    # References
    tx_ref = models.CharField(max_length=100, unique=True, help_text="Our internal reference sent to provider")
    provider_ref = models.CharField(max_length=100, null=True, blank=True, help_text="Reference from Chapa")
    
    # Context
    description = models.TextField(null=True, blank=True)
    status = models.CharField(
        max_length=50, 
        choices=TransactionStatus.choices, 
        default=TransactionStatus.CREATED
    )
    
    # Metadata & Auditing
    response_dump = models.JSONField(default=dict, blank=True)
    checkout_url = models.URLField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.tx_ref} - {self.amount} {self.currency} [{self.status}]"
