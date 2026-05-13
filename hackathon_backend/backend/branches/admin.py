from django.contrib import admin
from .models import Departement, Table

@admin.register(Departement)
class DepartementAdmin(admin.ModelAdmin):
    list_display = ('nom', 'type_business', 'is_active', 'created_at')
    list_filter = ('type_business', 'is_active')
    search_fields = ('nom',)

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('numero_table', 'departement', 'is_available')
    list_filter = ('departement', 'is_available')