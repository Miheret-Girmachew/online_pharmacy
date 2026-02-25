# authentication/tests/test_auth_api.py
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()

# URL names based on your authentication/urls.py
REGISTER_URL = reverse('authentication:register')      # name="register"
LOGIN_URL = reverse('authentication:login')            # name="login"
REFRESH_URL = reverse('authentication:token_refresh')  # name="token_refresh"
ME_URL = reverse('authentication:profile')             # name="profile"


def create_user(**kwargs):
    """Helper to create a user"""
    defaults = {
        'email': 'test@example.com',
        'password': 'testpass123',
        'username': 'testuser',
        'role': 'user',
    }
    defaults.update(kwargs)
    return User.objects.create_user(**defaults)


class PublicAuthApiTests(TestCase):
    """Test public endpoints (no auth required)"""

    def setUp(self):
        self.client = APIClient()

    def test_register_user_success(self):
        """Test registering a regular user"""
        payload = {
            'email': 'user@example.com',
            'password': 'strongpass123',
            'username': 'regularuser',
            'role': 'user',
            'phone': '+251911223344'
        }
        res = self.client.post(REGISTER_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', res.data)
        self.assertIn('userId', res.data)
        self.assertEqual(res.data['role'], 'user')

        user = User.objects.get(email=payload['email'])
        self.assertTrue(user.check_password(payload['password']))

    def test_register_pharmacy_admin_success(self):
        """Test registering a pharmacy admin"""
        payload = {
            'email': 'admin@pharmacy.et',
            'password': 'adminpass123',
            'username': 'pharmacyadmin',
            'role': 'pharmacy_admin',
            'phone': '+251988776655'
        }
        res = self.client.post(REGISTER_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', res.data)
        self.assertEqual(res.data['role'], 'pharmacy_admin')

    def test_register_duplicate_email_fails(self):
        """Test registering with existing email returns 400"""
        create_user(email='exists@example.com')
        payload = {
            'email': 'exists@example.com',
            'password': 'pass123',
            'username': 'newuser',
            'role': 'user'
        }
        res = self.client.post(REGISTER_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_invalid_role_fails(self):
        """Test invalid role value returns 400"""
        payload = {
            'email': 'badrole@example.com',
            'password': 'pass123',
            'username': 'badrole',
            'role': 'superadmin'   # not in ROLE_CHOICES
        }
        res = self.client.post(REGISTER_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success_returns_token_and_role(self):
        """Test login returns token, userId and role"""
        user = create_user(
            email='login@example.com',
            password='loginpass123',
            role='pharmacy'
        )
        payload = {
            'email': 'login@example.com',
            'password': 'loginpass123'
        }
        res = self.client.post(LOGIN_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('access', res.data)
        self.assertIn('refresh', res.data)
        self.assertIn('userId', res.data)
        self.assertEqual(res.data['role'], 'pharmacy')

    def test_login_wrong_password_fails(self):
        """Test wrong password returns 401"""
        create_user(email='test@example.com', password='correct')
        payload = {'email': 'test@example.com', 'password': 'wrong'}
        res = self.client.post(LOGIN_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_missing_password_fails(self):
        """Test missing password returns 400"""
        payload = {'email': 'test@example.com'}
        res = self.client.post(LOGIN_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_refresh_token_success(self):
        """Test token refresh works"""
        user = create_user(email='refresh@example.com', password='pass')
        login_res = self.client.post(LOGIN_URL, {
            'email': 'refresh@example.com',
            'password': 'pass'
        }, format='json')

        refresh_token = login_res.data['refresh']
        res = self.client.post(REFRESH_URL, {'refresh': refresh_token}, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('access', res.data)


class PrivateAuthApiTests(TestCase):
    """Test endpoints that require authentication"""

    def setUp(self):
        self.user = create_user(
            email='me@example.com',
            password='mepass123',
            username='meuser',
            role='pharmacy_admin'
        )
        self.client = APIClient()
        # Get token
        login_res = self.client.post(LOGIN_URL, {
            'email': 'me@example.com',
            'password': 'mepass123'
        }, format='json')
        token = login_res.data['access']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    def test_get_me_success(self):
        """Test retrieving own profile"""
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['email'], self.user.email)
        self.assertEqual(res.data['role'], 'pharmacy_admin')

    def test_update_me_success(self):
        """Test updating own profile (e.g. phone)"""
        payload = {'phone': '+251911000111'}
        res = self.client.patch(ME_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertEqual(self.user.phone, '+251911000111')

    def test_me_unauthenticated_fails(self):
        """Test accessing /me without token returns 401"""
        self.client.credentials()  # remove token
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)