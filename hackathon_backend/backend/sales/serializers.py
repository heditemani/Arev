from rest_framework import serializers
from .models import Commande, LineCommande, Paiement
from products.models import Produit

class LineCommandeSerializer(serializers.ModelSerializer):
    produit_nom = serializers.ReadOnlyField(source='produit.nom')

    class Meta:
        model = LineCommande
        fields = ['id', 'produit', 'produit_nom', 'quantite', 'prix_unitaire', 'sous_total']
        read_only_fields = ['prix_unitaire', 'sous_total']

class PaiementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paiement
        fields = ['methode', 'montant', 'date_paiement']

class CommandeSerializer(serializers.ModelSerializer):
    lines = LineCommandeSerializer(many=True)
    paiement = PaiementSerializer(required=False)
    vendeur_name = serializers.ReadOnlyField(source='vendeur.username')

    class Meta:
        model = Commande
        fields = ['id', 'reference', 'vendeur_name', 'departement', 'total_ttc', 'status', 'date_commande', 'lines', 'paiement']
        read_only_fields = ['vendeur', 'departement', 'total_ttc']

    def create(self, validated_data):
        lines_data = validated_data.pop('lines')
        paiement_data = validated_data.pop('paiement', None)
        user = self.context['request'].user
        
        
        commande = Commande.objects.create(
            vendeur=user, 
            departement=user.departement, 
            **validated_data
        )
        
        total_ttc = 0
        for line_data in lines_data:
            produit = line_data['produit']
            qte = line_data['quantite']
            
            
            if produit.stock < qte:
                raise serializers.ValidationError(f"Stock insuffisant pour {produit.nom}")
            
            
            line = LineCommande.objects.create(
                commande=commande, 
                prix_unitaire=produit.prix,
                **line_data
            )
            
          
            produit.stock -= qte
            produit.save()
            
            total_ttc += line.sous_total

       
        commande.total_ttc = total_ttc
        commande.save()

        
        if paiement_data:
            Paiement.objects.create(commande=commande, **paiement_data)
            commande.status = 'payee'
            commande.save()

        return commande