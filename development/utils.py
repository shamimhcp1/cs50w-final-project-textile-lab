import os
import openpyxl
import win32com.client
from .models import DevReport

def convert_excel_to_pdf(excel_file_name):
    ...
    # ... (unchanged)

def get_tear_result(wash_tear_warp, wash_tear_weft):
    ...
    # ... (unchanged)

def get_tensile_result(tensile_warp, tensile_weft):
    ...
    # ... (unchanged)

def get_rubbing_result(dry_rubbing, wet_rubbing):
    ...
    # ... (unchanged)

def get_final_result(tear_result, tensile_result, rubbing_result):
    ...
    # ... (unchanged)

def generate_report(dev_report):
    ...
    # ... (unchanged)

    # Update the specific cells with new data
    # ...

    # Save the updated Excel file with a new name
    # ...

    # Convert Excel to PDF
    excel_file_name = 'excelfile.xlsx'
    convert_excel_to_pdf(excel_file_name)
