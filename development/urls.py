from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview, name='home'),
    path('buyers/', views.buyer_list_create_view, name='buyer-list-create'),
    path('buyers/<int:pk>/', views.buyer_detail_view, name='buyer-detail'),
]
