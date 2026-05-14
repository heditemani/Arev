from rest_framework import viewsets, permissions
from .models import Categorie, Produit
from .serializers import CategorieSerializer, ProduitSerializer

class CategorieViewSet(viewsets.ModelViewSet):
    """
    CRUD kemel lel Categories m3a filtre par département.
    Un superadmin voit tout, un utilisateur normal ne voit que les catégories de son département.
    """
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        # 1. Verification Superuser (Ychouf kol chay)
        # Isstahmel is_superuser mta3 Django khaterha dima tikhdem
        if user.is_superuser or (hasattr(user, 'role') and user.role == 'superadmin'):
            return Categorie.objects.all()
        
        # 2. Kenou user normal, n'filtrer par département mte3ou
        if hasattr(user, 'departement') and user.departement:
            return Categorie.objects.filter(departement=user.departement)
            
        # 3. Ken ma famma 7atta condition, ma nrajja3 chay
        return Categorie.objects.none()


class ProduitViewSet(viewsets.ModelViewSet):
    """
    CRUD kemel lel Produits m3a filtre automatique par département, 
    recherche par catégorie w barcode.
    """
    serializer_class = ProduitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Produit.objects.all()
        
        # --- Logic de filtrage par accès ---
        
        # Check ken el user is superadmin (standard Django or custom role)
        is_super = user.is_superuser or (hasattr(user, 'role') and user.role == 'superadmin')

        if not is_super:
            # Ken mouch superadmin, lezem ykoun 3andou département
            if hasattr(user, 'departement') and user.departement:
                # N'filtrer el produits elli teb3in les catégories mta3 el département hedha
                queryset = queryset.filter(categorie__departement=user.departement)
            else:
                # Ken user ma 3andouch département w mouch superadmin -> ma ychouf chay
                return Produit.objects.none()
        
        # --- Logic de recherche via Query Params ---

        # Filtrage par catégorie : ?categorie=ID
        categorie_id = self.request.query_params.get('categorie')
        if categorie_id:
            queryset = queryset.filter(categorie_id=categorie_id)

        # Recherche par barcode : ?barcode=123456
        barcode = self.request.query_params.get('barcode')
        if barcode:
            queryset = queryset.filter(barcode=barcode)
            
        return queryset

    def perform_create(self, serializer):
        """
        Sauvegarde automatique du produit.
        """
        serializer.save()