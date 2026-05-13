from rest_framework import generics, permissions 
from rest_framework.permissions import IsAuthenticated
from .models import User

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer,MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


