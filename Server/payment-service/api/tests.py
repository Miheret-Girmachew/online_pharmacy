from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch
from .models import Transaction, TransactionStatus

class TransactionModelTest(TestCase):
    def test_create_transaction(self):
        tx = Transaction.objects.create(
            user_id="user123",
            amount=100.00,
            tx_ref="test-ref",
            email="test@example.com"
        )
        self.assertEqual(tx.status, TransactionStatus.CREATED)
        self.assertEqual(str(tx.amount), "100.00")

class PaymentAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.initiate_url = reverse('initiate-payment')

    @patch('api.views.ChapaMixin.initialize_transaction')
    def test_initiate_payment_success(self, mock_chapa):
        # Mock Chapa success response
        mock_chapa.return_value = {
            "status": "success",
            "data": {"checkout_url": "https://checkout.chapa.co/123"}
        }

        data = {
            "amount": "150.00",
            "email": "customer@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "user_id": "user_456",
            "return_url": "http://localhost:8000/return"
        }

        response = self.client.post(self.initiate_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('checkout_url', response.data)
        
        transaction = Transaction.objects.first()
        self.assertEqual(transaction.status, TransactionStatus.PENDING)
        self.assertEqual(transaction.amount, 150.00)

    @patch('api.views.ChapaMixin.initialize_transaction')
    def test_initiate_payment_failure(self, mock_chapa):
        # Mock Chapa failure
        mock_chapa.return_value = {"status": "failed", "message": "Validation error"}

        data = {
            "amount": "150.00",
            "email": "customer@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "user_id": "user_456",
            "return_url": "http://localhost:8000/return"
        }

        response = self.client.post(self.initiate_url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        transaction = Transaction.objects.first()
        self.assertEqual(transaction.status, TransactionStatus.FAILED)
