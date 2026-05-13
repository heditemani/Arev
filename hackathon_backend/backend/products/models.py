from django.db import models
from cloudinary.models import CloudinaryField
from branches.models import Departement 

class Categorie(models.Model):
    nom = models.CharField(max_length=100)
    image = CloudinaryField('image', folder='categories/', null=True, blank=True)
    
    departement = models.ForeignKey(Departement, on_delete=models.CASCADE, related_name='categories')
    is_active = models.BooleanField(default=True)
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Catégories"

    def __str__(self):
        return f"{self.nom} ({self.departement.nom})"

class Produit(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    image = CloudinaryField('image', folder='products/', null=True, blank=True)
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, related_name='produits')
    is_active = models.BooleanField(default=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    barcode = models.BigIntegerField(unique=True, blank=True, null=True)
    stock = models.PositiveIntegerField(default=0)
    
    reference = models.CharField(
        max_length=50, 
        unique=True, 
        blank=True, 
        null=True,
        help_text="Reference unique mta3 el produit (SKU)"
    )

    def __str__(self):
        
        if self.barcode:
            return f"{self.nom} [{self.barcode}]"
        return self.nom