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
from .forms import DevReportForm
from .utils import render_to_pdf, generate_result


@login_required(login_url='login')
def index(request):
    return render(request, 'development/index.html')

data = {
    "company": "Dennnis Ivanov Company",
    "address": "123 Street name",
    "city": "Vancouver",
    "state": "WA",
    "zipcode": "98663",
    "phone": "555-555-2345",
    "email": "youremail@dennisivy.com",
    "website": "dennisivy.com",
}

@login_required(login_url='login')
def pdf_download(request):
    pdf = render_to_pdf('development/report-details.html', data)
    if pdf:
        response = HttpResponse(pdf, content_type='application/pdf')
        filename = "Invoice_12341231.pdf" 
        response['Content-Disposition'] = f"attachment; filename={filename}"
        return response
    return HttpResponse("Error generating PDF", status=500)


@login_required(login_url='login')
def pdf_template(request):
    return render(request, 'development/report-details.html', data)

@login_required(login_url='login')
def pdf_view(request):
    pdf = render_to_pdf('development/report-details.html', data)
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


# get buyer_list_requirement with DevRequirementSerializer
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
            reports = DevReport.objects.all().order_by('-create_date')
            serializer = DevReportSerializer(reports, many=True)
            return JsonResponse({'status': 'success', 'reportList': serializer.data})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


# profile
@login_required(login_url='login')
def profile_view(request):
    return render(request, 'development/profile-view.html')

@login_required(login_url='login')
def change_password(request):
    return render(request, 'development/change-password.html')

# users
@login_required(login_url='login')
def manage_user(request):
    users = User.objects.all()  # Retrieve all user objects
    return render(request, 'development/manage-users.html', {
        'users' : users
    })

@login_required(login_url='login')
def create_user(request):
    return render(request, 'development/add-user.html')



@api_view(['GET'])
def ApiOverview(request):

    api_urls = {
        'home': '/',
        'buyer_list_create_view': '/buyers',
        'buyer_detail_view': '/buyers/pk',
        'dev_report_list_view': '/reports',
        'dev_report_detail_view': '/reports/pk',
        'dev_report_create': '/create'
    }
    return Response(api_urls)

# Report List
@api_view(['GET'])
def dev_report_list_view(request):
    reports = DevReport.objects.all()
    serializer = DevReportSerializer(reports, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def dev_report_detail_view(request, pk):
    try:
        report = DevReport.objects.get(pk=pk)
    except DevReport.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DevReportSerializer(report)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = DevReportSerializer(
            report, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        report.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Buyer list
@api_view(['GET', 'POST'])
def buyer_list_create_view(request):
    if request.method == 'GET':
        buyers = Buyer.objects.all()
        serializer = BuyerSerializer(buyers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        buyer_name = request.data.get('name')

        # Check if a buyer with the same name already exists
        if Buyer.objects.filter(name=buyer_name).exists():
            return Response({"detail": f"A buyer with the name '{buyer_name}' already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = BuyerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Buyer detail
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def buyer_detail_view(request, pk):
    try:
        buyer = Buyer.objects.get(pk=pk)
    except Buyer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BuyerSerializer(buyer)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = BuyerSerializer(
            buyer, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        buyer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
    

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


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


def forgot_password(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
        
    return render(request, 'development/forgot-password.html')