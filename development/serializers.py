from django.db.models import fields
from rest_framework import serializers
from .models import User, Buyer, DevFormat, DevColorShade, DevRequirement, DevReport

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'role')

class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = ('id', 'name')

class DevFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevFormat
        fields = ('id', 'buyer', 'format_path', 'format_label')

class DevColorShadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevColorShade
        fields = ('id', 'buyer', 'color_shade')

class DevRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevRequirement
        fields = ('id', 'buyer', 'format', 'color_shade', 'dry_rubbing', 'wet_rubbing', 
                  'wash_tear_warp', 'wash_tear_weft', 'tensile_warp', 'tensile_weft')

class DevReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevReport
        fields = ('id', 'buyer', 'format', 'color_shade', 'style', 'color', 'fab_ref',
                  'fab_supplier', 'sample_type', 'receive_date', 'report_date', 'create_date',
                  'created_by', 'dry_rubbing', 'wet_rubbing', 'rubbing_comment',
                  'raw_tear_warp', 'raw_tear_weft', 'wash_tear_warp', 'wash_tear_weft',
                  'tear_comment', 'tensile_warp', 'tensile_weft', 'tensile_comment', 'result')
