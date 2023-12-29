from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # users
    path('manage-user', views.manage_user, name='manage-user'),
    path('create-user', views.create_user, name='create-user'),
    # delete user
    path('delete-user', views.delete_user, name='delete-user'),
    # change password
    path('change-password', views.change_password, name='change-password'),
    # get-user-details
    path('get-user-details', views.get_user_details, name='get-user-details'),
    # edit user
    path('edit-user', views.edit_user, name='edit-user'),

    # buyer
    path('create-buyer', views.create_buyer, name='create-buyer'),
    path('manage-buyer', views.manage_buyer, name='manage-buyer'),
    # get active buyer
    path('get-active-buyer', views.get_active_buyer, name='get-active-buyer'),
    # delete buyer
    path('delete-buyer', views.delete_buyer, name='delete-buyer'),
    # edit buyer
    path('edit-buyer', views.edit_buyer, name='edit-buyer'),
    # get buyerlist with requirement
    path('buyer-list-requirement', views.buyer_list_requirement, name='buyer-list-requirement'),


    # requirements
    path('manage-requirement', views.manage_requirement, name='manage-requirement'),
    path('create-requirement', views.create_requirement, name='create-requirement'),
    # delete requirements
    path('delete-requirement', views.delete_requirement, name='delete-requirement'),
    # edit requirements
    path('edit-requirement', views.edit_requirement, name='edit-requirement'),
    # get requirements by buyer
    path('get-requirement-by-buyer', views.get_requirement_by_buyer, name='get-requirement-by-buyer'),


    # report
    path('create-report', views.create_report, name='create-report'),
    path('manage-report', views.manage_report, name='manage-report'),
    # delete-report
    path('delete-report', views.delete_report, name='delete-report'),
    # edit-report
    path('edit-report', views.edit_report, name='edit-report'),
    # view-report
    path('view-report', views.view_report, name='view-report'),
    # download-report
    path('download-report', views.download_report, name='download-report'),


]
