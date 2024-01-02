from django.db.models import fields
from rest_framework import serializers
from .models import User, Buyer, DevRequirement, DevReport

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'is_superuser', 'is_staff')

class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = ('__all__')

class DevRequirementSerializer(serializers.ModelSerializer):
    buyer_name = serializers.ReadOnlyField(source='buyer.name')

    class Meta:
        model = DevRequirement
        fields = [
            'id',
            'buyer',
            'buyer_name',
            'requirement_label',
            'dry_rubbing',
            'wet_rubbing',
            'rubbing_method',
            'rubbing_text',
            'wash_tear_warp',
            'wash_tear_weft',
            'tear_method',
            'tear_text',
            'tensile_warp',
            'tensile_weft',
            'tensile_method',
            'tensile_text',
            'is_active',
        ]

class DevReportSerializer(serializers.ModelSerializer):
    buyer_name = serializers.ReadOnlyField(source='buyer.name')
    requirement_label = serializers.ReadOnlyField(source='requirement.requirement_label')
    create_by_username = serializers.ReadOnlyField(source='create_by.username')

    class Meta:
        model = DevReport
        fields = [
            'id',
            'buyer',
            'buyer_name',
            'requirement',
            'requirement_label',
            'style',
            'color',
            'fab_ref',
            'fab_supplier',
            'sample_type',
            'receive_date',
            'report_date',
            'dry_rubbing',
            'wet_rubbing',
            'rubbing_comment',
            'raw_tear_warp',
            'raw_tear_weft',
            'wash_tear_warp',
            'wash_tear_weft',
            'tear_comment',
            'tensile_warp',
            'tensile_weft',
            'tensile_comment',
            'result',
            'create_date',
            'create_by',
            'create_by_username',
        ]