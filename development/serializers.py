from django.db.models import fields
from rest_framework import serializers
from .models import User, Buyer, DevFormat, DevRequirement, DevReport

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'role')

class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = ('__all__')

class DevFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevFormat
        fields = ('__all__')

class DevRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevRequirement
        fields = ('__all__')

class DevReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevReport
        fields = ('__all__')
