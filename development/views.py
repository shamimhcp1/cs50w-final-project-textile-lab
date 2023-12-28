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
from .serializers import BuyerSerializer, DevReportSerializer, DevRequirementSerializer, DevReportSerializer
from .utils import render_to_pdf, generate_result

# index
@login_required(login_url='login')
def index(request):
    return render(request, 'development/index.html')


# download_report
@login_required(login_url='login')
@require_http_methods(["GET"])
def download_report(request):
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
    if request.method == "GET":
        try:
            # get all buyers ordered by name
            reports = DevReport.objects.all().order_by('-id')
            serializer = DevReportSerializer(reports, many=True)
            return JsonResponse({'status': 'success', 'reportList': serializer.data})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# profile
@login_required(login_url='login')
def profile_view(request):
    return render(request, 'development/profile-view.html')


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


# users
@login_required(login_url='login')
def manage_user(request):
    users = User.objects.all()  # Retrieve all user objects
    return render(request, 'development/manage-users.html', {
        'users' : users
    })

# create_user
@login_required(login_url='login')
def create_user(request):
    return render(request, 'development/add-user.html')

# login
def login_view(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))

    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "development/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "development/login.html")
    
# logout
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# register
def register(request):

    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        role = request.POST.get("role", "")
        is_active = request.POST.get("is_active", 0)


        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "development/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.role = role
            user.is_active = is_active
            user.save()
        except IntegrityError:
            return render(request, "development/register.html", {
                "message": "Username already taken."
            })
        if not request.user.is_authenticated:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return HttpResponseRedirect(reverse("manage-users"))
    else:
        if request.user.is_authenticated and not request.user.is_superuser:
            return HttpResponseRedirect(reverse("index"))
        
        return render(request, "development/register.html")

# forgot_password
def forgot_password(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
        
    return render(request, 'development/forgot-password.html')