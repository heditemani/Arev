from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
   
    list_display = ('username', 'email', 'role', 'departement', 'is_staff')
    

    fieldsets = UserAdmin.fieldsets + (
        ('Informations Professionnelles', {'fields': ('role', 'departement', 'telephone', 'cin')}),
    )
    
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Informations Professionnelles', {'fields': ('role', 'departement', 'telephone', 'cin')}),
    )

# N'registriw el CustomUserAdmin fi blasset el UserAdmin el 3adi
admin.site.register(User, CustomUserAdmin)