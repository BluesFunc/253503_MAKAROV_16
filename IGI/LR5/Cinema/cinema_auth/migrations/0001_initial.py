# Generated by Django 5.0.6 on 2024-05-17 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=50)),
                ('genre', models.CharField(max_length=50)),
                ('duration', models.DurationField()),
                ('description', models.TextField(max_length=100)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
    ]
