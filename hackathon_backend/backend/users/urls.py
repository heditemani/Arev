from django.urls import path
from .views import MyTokenObtainPairView, UserListView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import get_user_profile, MyTokenObtainPairView, UserListView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('all/', UserListView.as_view(), name='user-list'),
    path('me/', get_user_profile, name='user-profile'),
]