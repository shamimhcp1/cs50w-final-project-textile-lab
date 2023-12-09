from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from .models import Buyer, DevReport
from .serializers import BuyerSerializer, DevReportSerializer

from .forms import DevReportForm
from .utils import generate_report

from django.templatetags.static import static
# dev_format_url = static('app/format/dev_format.xlsx')


@api_view(['GET'])
def ApiOverview(request):
    
    api_urls = {
        'home': '/',
        'buyer_list_create_view': '/buyers',
        'buyer_detail_view': '/buyers/pk',
        'dev_report_list_view' : '/reports',
        'dev_report_detail_view' : '/reports/pk',
        'dev_report_create' : '/create'
    }
    return Response(api_urls)

# Report List
@api_view(['GET'])
def dev_report_list_view(request):
    reports = DevReport.objects.all()
    serializer = DevReportSerializer(reports, many=True)
    return Response(serializer.data)


# Report Create
# @api_view(['POST'])
def dev_report_create(request):
    if request.method == 'POST':
        form = DevReportForm(request.POST)
        if form.is_valid():
            dev_report = form.save(commit=False)
            dev_report.created_by = request.user
            dev_report.save()

            # Generate the report
            message = generate_report(dev_report)
            if message == "Success":
                return HttpResponse("Success")
            else:
                return HttpResponse(f"Error: {message}")

            # return redirect('dev-report-create')  # Redirect to the same page after submission

    else:
        form = DevReportForm()

    return render(request, 'development/index.html', {
        'form': form
    })

    
    # serializer = DevReportSerializer(data=request.data)
    # if serializer.is_valid():
    #     # serializer.save()
    #     create_pdf_excel(request) # save a pdf & excel copy of the report
        
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def dev_report_details(request):
    return render(request, 'development/report-details.html')

# Report Details 
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
        serializer = DevReportSerializer(report, data=request.data, partial=request.method == 'PATCH')
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
        serializer = BuyerSerializer(buyer, data=request.data, partial=request.method == 'PATCH')
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        buyer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)