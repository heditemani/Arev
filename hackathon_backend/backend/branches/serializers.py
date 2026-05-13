from rest_framework import serializers
from .models import Departement, Table

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class DepartementSerializer(serializers.ModelSerializer):
    
    tables = TableSerializer(many=True, read_only=True)

    class Meta:
        model = Departement
        fields = ['id', 'nom', 'adresse', 'telephone', 'type_business', 'logo', 'is_active', 'tables']