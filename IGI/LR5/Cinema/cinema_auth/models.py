import uuid

from django.db import models


class Movie(models.Model):
    name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    duration = models.DurationField()
    description = models.TextField(max_length=100)
    rating = models.fields.DecimalField(max_digits=3, decimal_places=2)

