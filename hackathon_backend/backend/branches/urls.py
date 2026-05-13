from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartementViewSet, TableViewSet

router = DefaultRouter()
router.register(r'list', DepartementViewSet)
router.register(r'tables', TableViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/users/', include('users.urls')),
]