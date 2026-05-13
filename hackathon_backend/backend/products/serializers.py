from rest_framework import serializers
from .models import Categorie, Produit

class CategorieSerializer(serializers.ModelSerializer):
    """
    Serializer mta3 el Categorie m3a image URL mel Cloudinary
    """
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Categorie
        fields = ['id', 'nom', 'image', 'image_url', 'departement', 'is_active', 'date_creation']
        read_only_fields = ['id', 'date_creation']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None


class ProduitSerializer(serializers.ModelSerializer):
    """
    Serializer mta3 el Produit m3a el barcode wel reference
    """
    categorie_name = serializers.ReadOnlyField(source='categorie.nom')
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Produit
        fields = [
            'id', 'reference', 'barcode', 'nom', 'prix', 'description', 'stock',
            'image', 'image_url', 'categorie', 'categorie_name', 
            'is_active', 'date_creation'
        ]
        read_only_fields = ['id', 'date_creation']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def validate_reference(self, value):
        """
        Check ken el reference déjà mawjouda (ken mouch null)
        """
        if value and Produit.objects.filter(reference=value).exclude(id=self.instance.id if self.instance else None).exists():
            raise serializers.ValidationError("Attention, el reference hedhi t-asta3mlet déjà!")
        return value

    def validate_barcode(self, value):
        """
        Check ken el barcode déjà mawjoud
        """
        if value and Produit.objects.filter(barcode=value).exclude(id=self.instance.id if self.instance else None).exists():
            raise serializers.ValidationError("Attention, el barcode hedha mawjoud 3and produit ekher!")
        return value