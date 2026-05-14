from rest_framework import generics, permissions 
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import User
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer,MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    return Response({
        'username': user.username,
        'role': user.role, # Verifi elli andek champ 'role' fi model User mteek
        'email': user.email
    })


