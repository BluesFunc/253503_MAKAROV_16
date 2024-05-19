import datetime

from django.db import models
from django.shortcuts import reverse
from django.core.validators import MaxValueValidator, MinValueValidator


class CompanyInfo(models.Model):
    text = models.TextField(max_length=100, default="Норм компания, а че?")


class News(models.Model):
    header = models.CharField(max_length=100)
    description = models.TextField(max_length=300)
    image_url = models.URLField()
    post_date = models.DateField(default=datetime.date.today())

    def __str__(self):
        return self.header

    class Meta:
        ordering = ["-post_date"]


class FAQ(models.Model):
    question_text = models.TextField(max_length=150)
    answer_text = models.TextField(max_length=150)
    answer_date = models.DateField()

    class Meta:
        ordering = ["-answer_date"]

    def __str__(self):
        return f"Qestion {self.id} "


class EmployeesContact(models.Model):
    photo_url = models.URLField(default=
                                "https://sun9-49.userapi.com/impg/gVRm6uT90Vcqzwwx6DXUAAmdTYtWJylDQ1Evrw/3-AeHsiEe1k.jpg?size=441x464&quality=96&sign=a67bdea2e6159a0502ad04e0536acfc3&type=album")
    name = models.CharField()
    position = models.CharField(max_length=30)
    duties = models.TextField()
    phone_number = models.CharField()
    mail = models.EmailField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class VacancyInfo(models.Model):
    position = models.CharField()
    salary_per_month = models.DecimalField(max_digits=10, decimal_places=3)
    description = models.TextField()

    def __str__(self):
        return self.position

    class Meta:
        ordering = ['position']


class Review(models.Model):
    issuer = models.CharField(max_length=50)
    mark = models.IntegerField(validators=[
        MaxValueValidator(10),
        MinValueValidator(0)
    ])
    review_text = models.TextField()
    post_data = models.DateField()

    def __str__(self):
        return f"{self.issuer} {self.id}"

    class Meta:
        ordering = ['-post_data']


class Coupon(models.Model):
    code = models.CharField()
    discount = models.IntegerField(validators=[
        MaxValueValidator(99), MinValueValidator(1)
    ])


