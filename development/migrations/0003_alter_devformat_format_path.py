# Generated by Django 4.2 on 2023-12-04 12:26

import development.models
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("development", "0002_alter_buyer_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="devformat",
            name="format_path",
            field=models.FileField(
                blank=True, null=True, upload_to=development.models.format_file_path
            ),
        ),
    ]
