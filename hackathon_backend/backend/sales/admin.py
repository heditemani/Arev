from django.contrib import admin
from .models import Commande, LineCommande, Paiement

class LineCommandeInline(admin.TabularInline):
    model = LineCommande
    extra = 0
    readonly_fields = ['sous_total']

class PaiementInline(admin.StackedInline):
    model = Paiement
    extra = 0

@admin.register(Commande)
class CommandeAdmin(admin.ModelAdmin):
    list_display = ['reference', 'vendeur', 'departement', 'total_ttc', 'status', 'date_commande']
    list_filter = ['status', 'departement', 'date_commande']
    search_fields = ['reference']
    inlines = [LineCommandeInline, PaiementInline]