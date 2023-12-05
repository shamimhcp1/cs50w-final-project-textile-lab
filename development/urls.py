from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview, name='home'),
    
    path('buyers/', views.buyer_list_create_view, name='buyer-list-create'),
    path('buyers/<int:pk>/', views.buyer_detail_view, name='buyer-detail'),

    path('reports/', views.dev_report_list_view, name='dev-report-list'),
    path('reports/<int:pk>/', views.dev_report_detail_view, name='dev-report-detail'),
    path('create/', views.dev_report_create, name='dev-report-create')
]
