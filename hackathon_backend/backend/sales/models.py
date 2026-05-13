from django.db import models
from django.conf import settings
from products.models import Produit
from branches.models import Departement

class Commande(models.Model):
    STATUS_CHOICES = [
        ('en_attente', 'En Attente'),
        ('payee', 'Payée'),
        ('annulee', 'Annulée'),
    ]

    reference = models.CharField(max_length=50, unique=True, verbose_name="Référence")
    vendeur = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='commandes',
        verbose_name="Vendeur"
    )
    departement = models.ForeignKey(
        Departement, 
        on_delete=models.CASCADE, 
        related_name='commandes',
        verbose_name="Departement"
    )
    total_ttc = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name="Total TTC")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='en_attente')
    date_commande = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Commande"
        verbose_name_plural = "Commandes"

    def __str__(self):
        return f"{self.reference} - {self.total_ttc} DT"


class LineCommande(models.Model):
    commande = models.ForeignKey(
        Commande, 
        related_name='lines', 
        on_delete=models.CASCADE
    )
    produit = models.ForeignKey(
        Produit, 
        on_delete=models.CASCADE, 
        verbose_name="Produit"
    )
    quantite = models.PositiveIntegerField(default=1, verbose_name="Quantité")
    prix_unitaire = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix Unitaire")
    sous_total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):

        if not self.prix_unitaire:
            self.prix_unitaire = self.produit.prix

        self.sous_total = self.prix_unitaire * self.quantite
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Ligne de Commande"
        verbose_name_plural = "Lignes de Commande"


class Paiement(models.Model):
    METHODE_CHOICES = [
        ('especes', 'Espèces'),
        ('carte', 'Carte Bancaire'),
        ('virement', 'Virement'),
    ]

    commande = models.OneToOneField(
        Commande, 
        on_delete=models.CASCADE, 
        related_name='paiement',
        verbose_name="Commande"
    )
    montant = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Montant Payé")
    methode = models.CharField(max_length=20, choices=METHODE_CHOICES, default='especes')
    date_paiement = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Paiement"
        verbose_name_plural = "Paiements"

    def __str__(self):
        return f"Payé: {self.montant} DT ({self.methode})"