# Generated by Django 5.0.4 on 2024-08-27 05:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_room_host_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='host_name',
        ),
        migrations.DeleteModel(
            name='Guest',
        ),
    ]
