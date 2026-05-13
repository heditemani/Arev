from rest_framework import viewsets, permissions
from .models import Categorie, Produit
from .serializers import CategorieSerializer, ProduitSerializer

class CategorieViewSet(viewsets.ModelViewSet):
    """
    CRUD kemel lel Categories m3a filtre par département.
    """
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        if hasattr(user, 'role') and user.role == 'superadmin':
            return Categorie.objects.all()
        
        
        if hasattr(user, 'departement'):
            return Categorie.objects.filter(departement=user.departement)
        return Categorie.objects.none()

class ProduitViewSet(viewsets.ModelViewSet):
    """
    CRUD kemel lel Produits m3a filtre automatique, recherche par catégorie w barcode.
    """
    serializer_class = ProduitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Produit.objects.all()
        
       
        if not (hasattr(user, 'role') and user.role == 'superadmin'):
            if hasattr(user, 'departement'):
                queryset = queryset.filter(categorie__departement=user.departement)
            else:
                return Produit.objects.none()
        
        
        categorie_id = self.request.query_params.get('categorie')
        if categorie_id:
            queryset = queryset.filter(categorie_id=categorie_id)

       
        barcode = self.request.query_params.get('barcode')
        if barcode:
            queryset = queryset.filter(barcode=barcode)
            
        return queryset

    def perform_create(self, serializer):
        
        serializer.save()