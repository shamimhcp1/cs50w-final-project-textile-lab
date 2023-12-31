import json
import traceback  # Import the traceback module

from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status

from .models import Buyer, DevReport, User, DevRequirement
from .serializers import BuyerSerializer, DevReportSerializer, DevRequirementSerializer, DevReportSerializer, UserSerializer
from .utils import render_to_pdf, generate_result
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


# index
@login_required(login_url='login')
def index(request):
    return render(request, 'development/index.html')


# download_report
@login_required(login_url='login')
@require_http_methods(["GET"])
def download_report(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to download report'}, status=status.HTTP_400_BAD_REQUEST)
    
    report_id = request.GET.get('id')
    report = get_object_or_404(DevReport, pk=report_id)
    # get required data from report
    requirment = get_object_or_404(DevRequirement, pk=report.requirement.id)
    # render_to_pdf
    pdf = render_to_pdf('development/report-details.html', {
        'report': report,
        'requirment' : requirment
        })
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = f"Report_{report_id}.pdf" 
        response['Content-Disposition'] = f"attachment; filename={filename}"
        return response
    return HttpResponse("Error generating PDF", status=500)


# view_report
@login_required(login_url='login')
@require_http_methods(["GET"])
def view_report(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to view report'}, status=status.HTTP_400_BAD_REQUEST)
    
    report_id = request.GET.get('id')
    report = get_object_or_404(DevReport, pk=report_id)
    # get required data from report
    requirment = get_object_or_404(DevRequirement, pk=report.requirement.id)
    # render_to_pdf
    pdf = render_to_pdf('development/report-details.html', {
        'report': report,
        'requirment' : requirment
        })
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        return response
    return HttpResponse("Error generating PDF", status=500)


# create_report
@login_required(login_url='login')
@api_view(['POST'])
def create_report(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return Response({'status': 'error', 'message': 'You are not authorized to create report'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "POST":
        try:
            data = request.data
            print(data)  # Log the received data
            
            # Generate the result
            result = generate_result(data)
            data['rubbing_comment'] = result['rubbing_result']
            data['tear_comment'] = result['tear_result']
            data['tensile_comment'] = result['tensile_result']
            data['result'] = result['final_result']
            print(data) # Log the updated data

            serializer = DevReportSerializer(data=data)
            if serializer.is_valid():
                serializer.save(create_by_id=request.user.id)
                return Response({'status': 'success', 'message': 'Report created successfully'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)  # Log any exceptions
            traceback.print_exc()
            return Response({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# edit_report
@login_required(login_url='login')
@require_http_methods(["GET", "PUT"])
def edit_report(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to edit report'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            report_id = request.GET.get('id')
            report = get_object_or_404(DevReport, pk=report_id)
            serializer = DevReportSerializer(report)
            return JsonResponse({'status': 'success', 'report': serializer.data})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            report_id = data.get('id')
            report = get_object_or_404(DevReport, pk=report_id)
            # Generate the result
            result = generate_result(data)
            data['rubbing_comment'] = result['rubbing_result']
            data['tear_comment'] = result['tear_result']
            data['tensile_comment'] = result['tensile_result']
            data['result'] = result['final_result']
            print(data) # Log the updated data
            serializer = DevReportSerializer(report, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status': 'success', 'message': 'Report updated successfully'})
            return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# delete_report
@login_required(login_url='login')
@require_http_methods(["DELETE"])
def delete_report(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to delete report'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        try:
            report_id = request.GET.get('id')
            report = get_object_or_404(DevReport, pk=report_id)
            report.delete()
            return JsonResponse({'status': 'success', 'message': 'Report deleted successfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# create buyer
@login_required(login_url='login')
@api_view(['POST'])
def create_buyer(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return Response({'status': 'error', 'message': 'You are not authorized to create buyer'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "POST":
        try:
            data = request.data
            print(data)  # Log the received data
            serializer = BuyerSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success', 'message': 'Buyer created successfully'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)  # Log any exceptions
            return Response({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# manage_buyer
@login_required(login_url='login')
@require_http_methods(["GET"])
def manage_buyer(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to manage buyer'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            # get all buyers ordered by name
            buyers = Buyer.objects.all().order_by('name')
            serializer = BuyerSerializer(buyers, many=True)
            return JsonResponse({'status': 'success', 'buyerList': serializer.data})
        except Exception as e:
            print(e)  # Log any exceptions
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# get buyer_list_requirement
@login_required(login_url='login')
@require_http_methods(["GET"])
def buyer_list_requirement(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to get buyer list'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            # get set() of buyers from DevRequirementSerializer 
            buyers = DevRequirement.objects.filter(is_active=1).values('buyer__id', 'buyer__name').distinct()
            return JsonResponse({'status': 'success', 'buyerList': list(buyers)})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# get_active_buyer
@login_required(login_url='login')
@require_http_methods(["GET"])
def get_active_buyer(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to get buyer list'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            # get all buyers ordered by name
            buyers = Buyer.objects.filter(is_active=1).order_by('name')
            serializer = BuyerSerializer(buyers, many=True)
            return JsonResponse({'status': 'success', 'buyerList': serializer.data})
        except Exception as e:
            print(e)


# delete-buyer
@login_required(login_url='login')
@require_http_methods(["DELETE"])
def delete_buyer(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to delete buyer'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        try:
            buyer_id = request.GET.get('id')
            buyer = get_object_or_404(Buyer, pk=buyer_id)
            buyer.delete()
            return JsonResponse({'status': 'success', 'message': 'Buyer deleted successfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#edit buyer
@login_required(login_url='login')
@require_http_methods(["GET", "PUT"])
def edit_buyer(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to edit buyer'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            buyer_id = request.GET.get('id')
            buyer = get_object_or_404(Buyer, pk=buyer_id)
            serializer = BuyerSerializer(buyer)
            return JsonResponse({'status': 'success', 'buyer': serializer.data})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            buyer_id = data.get('id')
            buyer = get_object_or_404(Buyer, pk=buyer_id)
            serializer = BuyerSerializer(buyer, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status': 'success', 'message': 'Buyer updated successfully'})
            return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# create_requirement
@login_required(login_url='login')
@api_view(['POST'])
def create_requirement(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return Response({'status': 'error', 'message': 'You are not authorized to create requirement'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "POST":
        try:
            data = request.data
            print(data)  # Log the received data
            serializer = DevRequirementSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success', 'message': 'Requirement created successfully'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# manage_requirement
@login_required(login_url='login')
@require_http_methods(["GET"])
def manage_requirement(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to manage requirement'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            # get all buyers ordered by name
            requirements = DevRequirement.objects.all().order_by('buyer__name')
            serializer = DevRequirementSerializer(requirements, many=True)
            return JsonResponse({'status': 'success', 'devRequirementList': serializer.data})
        except Exception as e:
            print(e)  # Log any exceptions
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


# get_requirement_by_buyer
@login_required(login_url='login')
@require_http_methods(["GET"])
def get_requirement_by_buyer(request):
    # check if user not is_staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to get requirement list'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            buyer_id = request.GET.get('id')
            requirements = DevRequirement.objects.filter(buyer=buyer_id, is_active=1).order_by('requirement_label')
            serializer = DevRequirementSerializer(requirements, many=True)
            return JsonResponse({'status': 'success', 'requirementList': serializer.data})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)


# edit_requirement
@login_required(login_url='login')
@require_http_methods(["GET", "PUT"])
def edit_requirement(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to edit requirement'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            requirement_id = request.GET.get('id')
            requirement = get_object_or_404(DevRequirement, pk=requirement_id)
            serializer = DevRequirementSerializer(requirement)
            return JsonResponse({'status': 'success', 'devRequirement': serializer.data})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            requirement_id = data.get('id')
            requirement = get_object_or_404(DevRequirement, pk=requirement_id)
            serializer = DevRequirementSerializer(requirement, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'status': 'success', 'message': 'Requirement updated successfully'})
            return JsonResponse({'status': 'error', 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# delete_requirement
@login_required(login_url='login')
@require_http_methods(["DELETE"])
def delete_requirement(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to delete requirement'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        try:
            requirement_id = request.GET.get('id')
            requirement = get_object_or_404(DevRequirement, pk=requirement_id)
            requirement.delete()
            return JsonResponse({'status': 'success', 'message': 'Requirement deleted successfully'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# manage_report with DevReportSerializer
@login_required(login_url='login')
@require_http_methods(["GET"])
def manage_report(request):
    # check if user is not staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to manage reports'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # get page and limit from request, default to 1 and 10 if not provided
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', 10))
        
        # get all reports ordered by id
        reports = DevReport.objects.all().order_by('-id')
        
        # paginate the queryset
        paginator = Paginator(reports, limit)
        
        try:
            reports = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            reports = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            reports = paginator.page(paginator.num_pages)
        
        serializer = DevReportSerializer(reports, many=True)
        return JsonResponse({'status': 'success', 'reportList': serializer.data, 'totalPages': paginator.num_pages, 'totalReports': paginator.count})
    
    except Exception as e:
        print(e)
        return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# change_password
@login_required(login_url='login')
@require_http_methods(["PUT"])
def change_password(request):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            # check if current password is correct
            user = authenticate(username=request.user.username, password=data['current_password'])
            if user is None:
                return JsonResponse({'status': 'error', 'message': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
            # check if new password and confirm password is same
            if data['new_password'] != data['confirm_password']:
                return JsonResponse({'status': 'error', 'message': 'New password and confirm password is not same'}, status=status.HTTP_400_BAD_REQUEST)
            # change password
            user.set_password(data['new_password'])
            user.save()
            return JsonResponse({'status': 'success', 'message': 'Password changed successfully'})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# manage_user
@login_required(login_url='login')
@require_http_methods(["GET"])
def manage_user(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to manage user'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            # get all users ordered by username
            users = User.objects.all().order_by('username')
            print(users) # Log the users
            serializer = UserSerializer(users, many=True)
            return JsonResponse({'status': 'success', 'userList': serializer.data})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# create_user
@login_required(login_url='login')
@api_view(['POST'])
def create_user(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return Response({'status': 'error', 'message': 'You are not authorized to create user'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "POST":
        try:
            data = request.data
            print(data)  # Log the received data

            # check if username already exists
            if User.objects.filter(username=data['username']).exists():
                return Response({'status': 'error', 'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            # check if email already exists
            if User.objects.filter(email=data['email']).exists():
                return Response({'status': 'error', 'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            # check if password and confirmation is same
            if data['password'] != data['confirmation']:
                return Response({'status': 'error', 'message': 'Password and Confirm Password is not same'}, status=status.HTTP_400_BAD_REQUEST)
            
            # create user
            user = User.objects.create_user(data['username'], data['email'], data['password'])
            
            # check if data role is superuser or staff
            if data['role'] == "superuser":
                user.is_superuser = True
                user.is_staff = True
            elif data['role'] == "staff":
                user.is_superuser = False
                user.is_staff = True
            else:
                user.is_superuser = False
                user.is_staff = False
            
            user.is_active = data['is_active']
            user.save()
            return Response({'status': 'success', 'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)  # Log any exceptions
            traceback.print_exc()
            return Response({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# edit_user
@login_required(login_url='login')
@require_http_methods(["GET", "PUT"])
def edit_user(request):
    # check if user not is_superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to edit user'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            user_id = request.GET.get('id')
            user = get_object_or_404(User, pk=user_id)
            serializer = UserSerializer(user)
            return JsonResponse({'status': 'success', 'user': serializer.data})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            print(data) # Log the received data
            user_id = data.get('id')
            user = get_object_or_404(User, pk=user_id)
            # check if username already exists
            if User.objects.filter(username=data['username']).exclude(pk=user_id).exists():
                return Response({'status': 'error', 'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            # check if email already exists
            if User.objects.filter(email=data['email']).exclude(pk=user_id).exists():
                return Response({'status': 'error', 'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            # check if data has password and confirmation
            if data['password'] and data['confirmation']:
                # check if password and confirmation is same
                if data['password'] != data['confirmation']:
                    return Response({'status': 'error', 'message': 'Password and Confirm Password is not same'}, status=status.HTTP_400_BAD_REQUEST)
                # change password
                user.set_password(data['password'])
            
            # check if data role is superuser or staff
            if data['role'] == "superuser":
                user.is_superuser = True
                user.is_staff = True
            elif data['role'] == "staff":
                user.is_superuser = False
                user.is_staff = True
            else:
                user.is_superuser = False
                user.is_staff = False
            
            user.is_active = data['is_active']
            user.save()
            return JsonResponse({'status': 'success', 'message': 'User updated successfully'})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# get_user_details of logged in user
@login_required(login_url='login')
@require_http_methods(["GET"])
def get_user_details(request):
    if request.method == "GET":
        try:
            user = get_object_or_404(User, pk=request.user.id)
            serializer = UserSerializer(user)
            return JsonResponse({'status': 'success', 'user': serializer.data})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# delete_user
@login_required(login_url='login')
@require_http_methods(["DELETE"])
def delete_user(request):
    # check if user is superuser
    if not request.user.is_superuser:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to delete user'}, status=status.HTTP_400_BAD_REQUEST)
            
    if request.method == "DELETE":
        try:
            user_id = request.GET.get('id')
            user = get_object_or_404(User, pk=user_id)
            # check if user is superuser
            if user.is_superuser:
                return JsonResponse({'status': 'error', 'message': 'You are not authorized to delete superuser'}, status=status.HTTP_400_BAD_REQUEST)
            # check if user has created any report
            if DevReport.objects.filter(create_by=user_id).exists():
                return JsonResponse({'status': 'error', 'message': 'User has created report. So, you are not authorized to delete this user'}, status=status.HTTP_400_BAD_REQUEST)
            # delete user
            user.delete()
            return JsonResponse({'status': 'success', 'message': 'User deleted successfully'})
        except Exception as e:
            print(e)
            traceback.print_exc()
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# login
def login_view(request):
    # check if user is authenticated
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))

    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        print(user) # Log the user

        # Check if authentication successful
        if user is not None:
            if user.is_active:
                # User is authenticated and active
                login(request, user)
                return HttpResponseRedirect(reverse("index"))
            else:
                # User is authenticated but not active
                return render(request, "development/login.html", {
                    "message": "Your account is not activated. Please contact admin."
                })
        else:
            # Authentication failed (invalid credentials)
            return render(request, "development/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "development/login.html")
    
# logout
@login_required(login_url='login')
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# register
def register(request):
    # check if user is authenticated
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))

    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # check if username already exists
        if User.objects.filter(username=username).exists():
            return render(request, "development/register.html", {
                "message": "Username already taken."
            })
           
        # check if email already exists
        if User.objects.filter(email=email).exists():
            return render(request, "development/register.html", {
                "message": "Email already taken."
            })

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "development/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        user = User.objects.create_user(username, email, password)
        user.save()
        
        # login user
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
        
    return render(request, "development/register.html")


# search with devReportSerializer fields buyer__name, style, color, fab_ref, sample_type, result
@login_required(login_url='login')
@require_http_methods(["GET"])
def search(request):
    # check if user is not staff
    if not request.user.is_staff:
        return JsonResponse({'status': 'error', 'message': 'You are not authorized to search'}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET":
        try:
            # get page and limit from request, default to 1 and 10 if not provided
            page = int(request.GET.get('page', 1))
            limit = int(request.GET.get('limit', 10))
            search = request.GET.get('query')
            # get all reports ordered by id
            reports = DevReport.objects.filter(buyer__name__icontains=search) | DevReport.objects.filter(style__icontains=search) | DevReport.objects.filter(color__icontains=search) | DevReport.objects.filter(fab_ref__icontains=search) | DevReport.objects.filter(sample_type__icontains=search) | DevReport.objects.filter(result__icontains=search)
            # paginate the queryset
            paginator = Paginator(reports, limit)
            
            try:
                reports = paginator.page(page)
                print(reports) # Log the reports
            except PageNotAnInteger:
                # If page is not an integer, deliver first page.
                reports = paginator.page(1)
            except EmptyPage:
                # If page is out of range (e.g. 9999), deliver last page of results.
                reports = paginator.page(paginator.num_pages)
            
            serializer = DevReportSerializer(reports, many=True)
            return JsonResponse({'status': 'success', 'searchResult': serializer.data, 'totalPages': paginator.num_pages, 'totalReports': paginator.count})
        
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


