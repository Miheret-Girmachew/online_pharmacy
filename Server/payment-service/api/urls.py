from django.urls import path
from .views import InitiatePaymentView, ChapaWebhookView, TransactionStatusView

urlpatterns = [
    path('checkout/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('webhook/chapa/', ChapaWebhookView.as_view(), name='chapa-webhook'),
    path('status/<str:tx_ref>/', TransactionStatusView.as_view(), name='transaction-status'),
]
