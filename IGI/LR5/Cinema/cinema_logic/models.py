from django.db import models
from django.contrib.auth.models import User


class Movie(models.Model):
    name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    genre = models.CharField(max_length=50)
    duration = models.DurationField()
    description = models.TextField(max_length=100)
    rating = models.DecimalField(max_digits=3, decimal_places=2)


class Place(models.Model):
    rows = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D')
    )
    row = models.CharField(choices=rows, max_length=1)
    place = models.IntegerField()

    def __str__(self):
        return f"Ряд:{self.row} Место:{self.place} "


class Hall(models.Model):
    name = models.CharField(max_length=50, unique=True, blank=True)
    places = models.ManyToManyField('Place')

    def __str__(self):
        return self.name


class Ticket(models.Model):
    price = models.DecimalField(max_digits=6, decimal_places=2)
    place = models.ForeignKey('Place', on_delete=models.CASCADE, related_name='tickets', null=True)
    order = models.ForeignKey('Order', on_delete=models.CASCADE,
                              related_name='tickets', null=True, blank=True)
    show = models.ForeignKey('Show', on_delete=models.CASCADE, related_name='tickets', null=True)

    def __str__(self):
        return f"{self.place}"


class Show(models.Model):
    hall_number = models.ForeignKey('Hall', on_delete=models.CASCADE, related_name='show')
    film_date = models.DateTimeField()
    movie = models.ForeignKey('Movie', related_name='show', on_delete=models.CASCADE,
                              blank=True, null=True)

    def __str__(self):
        return f"Сеанс {self.movie.name}  {self.film_date}"


class Order(models.Model):
    customer = models.ForeignKey('Customer', related_name='orders', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Заказ {self.id} пользователя {self.customer.user.username}"


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
