import datetime

from django.db import models
from django.shortcuts import reverse
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone


class CompanyInfo(models.Model):
    about = models.TextField(max_length=100, default="Норм компания, а че?")
    history = models.TextField()
    video_url = models.FilePathField()
    logo_url = models.FilePathField()
    mail = models.CharField(max_length=50)

    def __str__(self):
        return self.mail


class News(models.Model):
    header = models.TextField(max_length=500)
    description = models.TextField(max_length=1500)
    link = models.URLField(max_length=500, null=True, default="https://www.kinopoisk.ru")
    image_url = models.URLField(max_length=500, blank=True, null=True)
    post_date = models.DateField(default=timezone.now)

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
    name = models.CharField(max_length=30)
    position = models.CharField(max_length=30)
    duties = models.TextField(max_length=300)
    phone_number = models.CharField(max_length=15)
    mail = models.EmailField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class VacancyInfo(models.Model):
    position = models.CharField(max_length=50)
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
    code = models.CharField(max_length=20, unique=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2)  # Процент скидки
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.code
    
class PartnerInfo(models.Model):
    partner_logo = models.URLField(default="https://lays.by/wp-content/uploads/2022/06/lays_logo.png")
    partner_site = models.URLField(default="https://lays.by/")


