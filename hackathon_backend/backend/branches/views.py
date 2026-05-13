from rest_framework import viewsets, permissions
from .models import Departement, Table
from .serializers import DepartementSerializer, TableSerializer


class IsAdminOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.role in ['ADMIN', 'SUPERADMIN']

class DepartementViewSet(viewsets.ModelViewSet):
    queryset = Departement.objects.all()
    serializer_class = DepartementSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminOrSuperAdmin()]
        
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = Table.objects.all()
        dept_id = self.request.query_params.get('dept')
        if dept_id is not None:
            queryset = queryset.filter(departement_id=dept_id)
        return queryset