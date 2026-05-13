from rest_framework import viewsets, permissions
from .models import Commande
from .serializers import CommandeSerializer

class CommandeViewSet(viewsets.ModelViewSet):
    serializer_class = CommandeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'superadmin':
            return Commande.objects.all()
        return Commande.objects.filter(departement=user.departement)

    def perform_create(self, serializer):
      
        serializer.save()