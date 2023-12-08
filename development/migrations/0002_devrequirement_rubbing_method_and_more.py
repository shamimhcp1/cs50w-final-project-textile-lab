# Generated by Django 4.2 on 2023-12-07 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('development', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='devrequirement',
            name='rubbing_method',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='devrequirement',
            name='tear_method',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='devrequirement',
            name='tensile_method',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]