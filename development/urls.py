from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("forgot-password", views.forgot_password, name="forgot-password"), 
    
    # buyer
    path('create-buyer', views.create_buyer, name='create-buyer'),
    path('manage-buyer', views.manage_buyer, name='manage-buyer'),
    # delete buyer
    path('delete-buyer', views.delete_buyer, name='delete-buyer'),

    # requirements
    path('manage-requirement', views.manage_requirement, name='manage-requirement'),
    path('create-requirement', views.create_requirement, name='create-requirement'),
    
    # report
    path('create-report', views.create_report, name='create-report'),
    path('manage-report', views.manage_report, name='manage-report'),
    
    # users
    path('manage-user', views.manage_user, name='manage-user'),
    path('create-user', views.create_user, name='create-user'),
    
    # profile
    path('profile-view', views.profile_view, name='profile-view'),
    path('change-password', views.change_password, name='change-password'),
    
    # pdf / Excel
    path('pdf-template', views.pdf_template, name='pdf-template'),
    path('pdf-view', views.pdf_view, name='pdf-view'),
    path('pdf-download', views.pdf_download, name='pdf-download'),

    # API
    path('api/', views.ApiOverview, name='api-home'),
    path('api/buyers/', views.buyer_list_create_view, name='api-buyer-list-create'),
    path('api/buyers/<int:pk>/', views.buyer_detail_view, name='api-buyer-detail'),
    path('api/reports/', views.dev_report_list_view, name='api-dev-report-list'),
    path('api/reports/<int:pk>/', views.dev_report_detail_view, name='api-dev-report-detail'),
    path('api/create/', views.create_report, name='api-dev-report-create')
]
