from django import forms
from .models import DevReport

class DevReportForm(forms.ModelForm):
    class Meta:
        model = DevReport
        fields = ('id', 'buyer', 'requirement', 'style', 'color', 'fab_ref',
                  'fab_supplier', 'sample_type', 'receive_date', 'report_date', 
                  'dry_rubbing', 'wet_rubbing', 'raw_tear_warp', 'raw_tear_weft', 
                  'wash_tear_warp', 'wash_tear_weft', 'tensile_warp', 'tensile_weft', )