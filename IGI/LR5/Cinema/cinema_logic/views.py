import os
from datetime import timedelta, datetime

from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import user_passes_test, login_required
from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
import matplotlib as matplt

matplt.use('Agg')
import matplotlib.pyplot as plt

import numpy as np

from .forms import LoginForm, RegisterForm, MovieForm, CouponForm, PurchaseTicketForm
from .models import Ticket, Show, Order, Customer, Movie
from header_page.models import Coupon


def calculate_median(data):
    sorted_data = sorted(data)
    n = len(sorted_data)
    if n == 0:
        return 0
    elif n % 2 == 1:
        return sorted_data[n // 2]
    else:
        return (sorted_data[n // 2 - 1] + sorted_data[n // 2]) / 2


def is_customer(user):
    return user.groups.filter(name='Customer').exists()


def is_employee(user):
    return not is_customer(user)


def register_form(request):
    return render(request, 'register.html', {"register_form": RegisterForm})


def login_user(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('main')  # Перенаправление на главную страницу после успешного входа
        else:
            form.add_error(None, "Неверное имя пользователя или пароль.")
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})


def register_user(request):
    email = request.POST['user_email']
    username = request.POST['username']
    password = request.POST['password']
    repeat_password = request.POST['repeat_password']
    role = request.POST['role']
    if User.objects.filter(email=email) or User.objects.filter(username=username):
        return messages.error(request, "Ваша почта или ник уже используется")
    elif password != repeat_password:
        return messages.error(request, "Пароли не совпадают")
    else:
        User.objects.create_user(email=email, username=username, password=password)
        user = authenticate(request, username=username, password=password)
        group = Group.objects.get(name=role)
        group.user_set.add(user)
        if role == 'Customer':
            Customer.objects.create(user=user)
        login(request, user)
        return redirect('main')


def show_list(request):
    today = datetime.now()
    shows = Show.objects.filter(film_date__gte=today).order_by('film_date')
    return render(request, 'show_list.html', {'shows': shows})


def show_detail(request, show_id):
    show = get_object_or_404(Show, id=show_id)
    tickets = Ticket.objects.filter(show=show, order=None)

    return render(request, 'show_detail.html', {'show': show, 'tickets': tickets})


@login_required
@user_passes_test(is_customer)
def user_orders(request):
    tickets = Ticket.objects.filter(order__customer__user=request.user).select_related('show', 'show__movie')

    shows = {}
    for ticket in tickets:
        show = ticket.show
        if show not in shows:
            shows[show] = []
        shows[show].append(ticket)

    return render(request, 'user_orders.html', {'shows': shows})


@login_required
@user_passes_test(is_customer)
def show_order_tickets(request, show_id):
    show = get_object_or_404(Show, id=show_id)
    tickets = Ticket.objects.filter(show=show, order__customer__user=request.user)
    return render(request, 'show_tickets.html', {'show': show, 'tickets': tickets})


@login_required
@user_passes_test(is_customer)
def purchase_tickets(request, show_id):
    show = get_object_or_404(Show, id=show_id)
    tickets = Ticket.objects.filter(show=show, order=None)

    if request.method == 'POST':
        ticket_id = request.POST['tickets']
        code = request.POST['code']
        ticket = Ticket.objects.get(pk=ticket_id)
        if Coupon.objects.filter(code=code).exists():
            coupon = Coupon.objects.get(code=code)

            if coupon.is_active:
                ticket.price -= ticket.price * coupon.discount / 100
            else:
                return redirect('.')
        else:
            return redirect('.')

        order = Order(customer=request.user.customer)
        order.save()
        ticket.order = order
        ticket.save()

        return redirect('user_orders')

    else:
        ticket_form = PurchaseTicketForm(show=show)

    return render(request, 'purchase_tickets.html',
                  {'form': ticket_form, 'tickets': tickets, 'show': show, })


@login_required
@user_passes_test(is_customer)
def order_summary(request):
    customer = get_object_or_404(Customer, user=request.user)
    orders = Order.objects.filter(customer=customer)

    return render(request, 'user_orders.html', {'orders': orders})


def logout_user(request):
    logout(request)
    return redirect('main')


@login_required
@user_passes_test(is_employee)
def add_movie(request):
    if request.method == 'POST':
        form = MovieForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('movie_list')
    else:
        form = MovieForm()
    return render(request, 'add_movie.html', {'form': form})


@login_required
@user_passes_test(is_employee)
def movie_list(request):
    movies = Movie.objects.all()
    return render(request, 'movie_list.html', {'movies': movies})


@login_required
@user_passes_test(is_employee)
def edit_movie(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    if request.method == 'POST':
        form = MovieForm(request.POST, instance=movie)
        if form.is_valid():
            form.save()
            return redirect('movie_list')
    else:
        form = MovieForm(instance=movie)
    return render(request, 'edit_movie.html', {'form': form})


@login_required
@user_passes_test(is_employee)
def delete_movie(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    if request.method == 'POST':
        movie.delete()
        return redirect('movie_list')
    return render(request, 'delete_movie.html', {'movie': movie})


def get_most_popular_movie():
    movie_sales = Show.objects.annotate(total_tickets=Count('tickets')).order_by('-total_tickets').first()
    return movie_sales.movie if movie_sales else None


def sales_statistics(request):
    # Получение текущей даты и даты за последние две недели
    end_date = datetime.now()
    start_date = end_date - timedelta(days=14)

    # Фильтрация заказов за последние две недели
    orders = Order.objects.filter(created_at__range=(start_date, end_date))

    # Сбор данных для статистики
    dates = []
    total_revenue = []
    tickets_sold = []
    daily_sales = orders.annotate(date=TruncDate('created_at')).values('date').annotate(
        total_revenue=Sum('tickets__price'),
        tickets_sold=Count('tickets')
    )

    for sales in daily_sales:
        dates.append(sales['date'])
        total_revenue.append(sales['total_revenue'])
        tickets_sold.append(sales['tickets_sold'])

    # Вычисление статистических данных
    total_tickets = sum(tickets_sold)
    average_tickets_sold = np.mean(tickets_sold)
    median_tickets_sold = np.median(tickets_sold)
    std_dev_tickets_sold = np.std(tickets_sold)

    # Построение графиков
    fig, ax = plt.subplots(2, 1, figsize=(10, 8))
    ax[0].plot(dates, total_revenue, marker='o')
    ax[0].set_title('Общая выручка по датам')
    ax[0].set_xlabel('Дата')
    ax[0].set_ylabel('Выручка')

    ax[1].plot(dates, tickets_sold, marker='o')
    ax[1].set_title('Проданные билеты по датам')
    ax[1].set_xlabel('Дата')
    ax[1].set_ylabel('Проданные билеты')

    plt.tight_layout()
    image_path = os.path.join(settings.MEDIA_ROOT, 'sales_statistics.png')
    plt.savefig(image_path)

    # Получение самого популярного фильма
    most_popular_movie = get_most_popular_movie()

    context = {
        'total_tickets': total_tickets,
        'average_tickets_sold': average_tickets_sold,
        'median_tickets_sold': median_tickets_sold,
        'std_dev_tickets_sold': std_dev_tickets_sold,
        'most_popular_movie': most_popular_movie,
        'image_path': image_path
    }

    return render(request, 'sales_statistics.html', context)


@login_required
@user_passes_test(is_employee)
def employee_page(request):
    return render(request, 'employee_page.html')
