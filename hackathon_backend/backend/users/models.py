from django.contrib.auth.models import AbstractUser
from django.db import models
from branches.models import Departement

class User(AbstractUser):
    ROLES = (
        ('SUPERADMIN', 'Super Admin'),
        ('ADMIN', 'Branch Admin'),
        ('CAISSIER', 'Caissier'),
        ('SERVEUR', 'Serveur'),
    )
    role = models.CharField(max_length=15, choices=ROLES)
    telephone = models.CharField(max_length=20, null=True, blank=True)
    cin = models.CharField(max_length=8, null=True, blank=True)
    departement = models.ForeignKey(
        Departement, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='staff'
    )