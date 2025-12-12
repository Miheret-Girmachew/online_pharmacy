from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PharmacyProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'role', 'phone']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        if user.role in ['pharmacy', 'pharmacy_admin']:
            PharmacyProfile.objects.create(user=user)
        return user

class PharmacyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PharmacyProfile
        fields = '__all__'
# authentication/serializers.py

class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()