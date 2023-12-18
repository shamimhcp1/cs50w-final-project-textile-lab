from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("forgot-password", views.forgot_password, name="forgot-password"), 
    
    # buyer
    path('buyer-add', views.buyer_add, name='buyer-add'),
    path('buyer-manage', views.buyer_manage, name='buyer-manage'),

    # requirements
    path('manage-requirements', views.manage_requirements, name='manage-requirements'),
    path('add-requirement', views.add_requirement, name='add-requirement'),
    
    # report
    path('create-report', views.create_report, name='create-report'),
    path('manage-reports', views.manage_reports, name='manage-reports'),
    
    # users
    path('manage-users', views.manage_users, name='manage-users'),
    path('add-user', views.add_user, name='add-user'),
    
    # profile
    path('my-profile', views.my_profile, name='my-profile'),
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
