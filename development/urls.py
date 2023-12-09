from django.urls import path
from . import views

urlpatterns = [

    path('dev-report/create', views.dev_report_create, name='dev-report-create'),
    
    path('pdf-template', views.pdf_template, name='pdf-template'),
    path('pdf-view', views.pdf_view, name='pdf-view'),
    path('pdf-download', views.pdf_download, name='pdf-download'),

    path('api/', views.ApiOverview, name='api-home'),
    path('api/buyers/', views.buyer_list_create_view, name='api-buyer-list-create'),
    path('api/buyers/<int:pk>/', views.buyer_detail_view, name='api-buyer-detail'),
    path('api/reports/', views.dev_report_list_view, name='api-dev-report-list'),
    path('api/reports/<int:pk>/', views.dev_report_detail_view, name='api-dev-report-detail'),
    path('api/create/', views.dev_report_create, name='api-dev-report-create')
]
