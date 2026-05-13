from django.contrib import admin
from .models import Categorie, Produit

@admin.register(Categorie)
class CategorieAdmin(admin.ModelAdmin):
    
    list_display = ('nom', 'departement', 'is_active', 'date_creation')

    list_filter = ('departement', 'is_active')
    
    search_fields = ('nom',)

@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = ('reference','barcode', 'nom', 'prix', 'categorie', 'is_active','stock')
    list_filter = ('categorie', 'is_active')
    search_fields = ('nom', 'reference')
    list_editable = ('stock',)
    readonly_fields = ('date_creation',)