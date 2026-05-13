from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['role'] = user.role
        token['departement'] = user.departement.id if user.departement else None
        
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['username'] = self.user.username
        data['role'] = self.user.role
        
        if self.user.departement:
            data['departement_id'] = self.user.departement.id
            data['departement_nom'] = self.user.departement.nom
        else:
            data['departement_id'] = None
            data['departement_nom'] = None
            
        return data

class UserSerializer(serializers.ModelSerializer):
    
    departement_name = serializers.ReadOnlyField(source='departement.nom')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'departement', 'departement_name', 'telephone', 'cin']