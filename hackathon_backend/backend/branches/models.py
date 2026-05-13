from django.db import models

class Departement(models.Model):
    BUSINESS_TYPES = (
        ('RESTO', 'Restaurant/Café'),
        ('RETAIL', 'Boutique/Magasin'),
    )
    
    nom = models.CharField(max_length=255)
    type_business = models.CharField(max_length=10, choices=BUSINESS_TYPES)
    
    logo = models.ImageField(upload_to='branches/logos/', null=True, blank=True)
    
    adresse = models.TextField()
    telephone = models.CharField(max_length=20, null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nom} ({self.type_business})"

class Table(models.Model):
    departement = models.ForeignKey(
        Departement, 
        on_delete=models.CASCADE, 
        related_name='tables'
    )
    numero_table = models.CharField(max_length=10)
    capacite = models.PositiveIntegerField(default=2)
    
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Table {self.numero_table} - {self.departement.nom}"