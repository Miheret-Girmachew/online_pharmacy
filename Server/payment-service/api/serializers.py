from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('id', 'tx_ref', 'status', 'response_dump', 'checkout_url', 'created_at', 'updated_at')

class InitiatePaymentSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    user_id = serializers.CharField(max_length=255)
    return_url = serializers.URLField()
