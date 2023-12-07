from django import forms
from .models import DevReport

class DevReportForm(forms.ModelForm):
    class Meta:
        model = DevReport
        fields = '__all__'