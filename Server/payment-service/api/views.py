from rest_framework import views, status, response
from rest_framework.response import Response
from .models import Transaction, TransactionStatus
from .serializers import InitiatePaymentSerializer, TransactionSerializer
from .chapa import ChapaMixin
from .services import ServiceIntegrator
import uuid
import logging

logger = logging.getLogger(__name__)

class InitiatePaymentView(views.APIView):
    def post(self, request):
        serializer = InitiatePaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = serializer.validated_data
        
        # 1. Create Local Transaction
        tx_ref = f"tx-{uuid.uuid4()}"
        transaction = Transaction.objects.create(
            user_id=data['user_id'],
            amount=data['amount'],
            tx_ref=tx_ref,
            status=TransactionStatus.CREATED,
            description=f"Payment for user {data['user_id']}"
        )

        # 2. Interact with Chapa
        chapa = ChapaMixin()
        chapa_response = chapa.initialize_transaction(
            email=data['email'],
            amount=data['amount'],
            tx_ref=tx_ref,
            first_name=data['first_name'],
            last_name=data['last_name'],
            return_url=data['return_url']
        )

        if chapa_response.get('status') == 'success':
            transaction.checkout_url = chapa_response['data']['checkout_url']
            transaction.status = TransactionStatus.PENDING
            transaction.response_dump = chapa_response
            transaction.save()
            return Response({
                "checkout_url": transaction.checkout_url,
                "tx_ref": transaction.tx_ref
            }, status=status.HTTP_201_CREATED)
        else:
            transaction.status = TransactionStatus.FAILED
            transaction.response_dump = chapa_response
            transaction.save()
            return Response(chapa_response, status=status.HTTP_400_BAD_REQUEST)

class ChapaWebhookView(views.APIView):
    def post(self, request):
        # In a real scenario, verify signature here using CHAPA_WEBHOOK_SECRET
        data = request.data
        tx_ref = data.get('tx_ref') or data.get('reference')
        
        if not tx_ref:
            return Response({"error": "No reference provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            transaction = Transaction.objects.get(tx_ref=tx_ref)
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

        # Verify with Chapa to be sure
        chapa = ChapaMixin()
        verification = chapa.verify_transaction(tx_ref)
        
        if verification.get('status') == 'success':
            transaction.status = TransactionStatus.SUCCESS
            transaction.response_dump = verification
            transaction.save()
            
            # Notify Inventory
            ServiceIntegrator.notify_inventory_success(tx_ref) # Using tx_ref as order ID for now
            
            return Response({"status": "verified"}, status=status.HTTP_200_OK)
        else:
            transaction.status = TransactionStatus.FAILED
            transaction.save()
            ServiceIntegrator.notify_inventory_failure(tx_ref, "Payment verification failed")
            return Response({"status": "failed"}, status=status.HTTP_200_OK)

class TransactionStatusView(views.APIView):
    def get(self, request, tx_ref):
        try:
            transaction = Transaction.objects.get(tx_ref=tx_ref)
            serializer = TransactionSerializer(transaction)
            return Response(serializer.data)
        except Transaction.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
