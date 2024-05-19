from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import ListView, DetailView

from .models import (FAQ, News, EmployeesContact, VacancyInfo, Review, Coupon)


def main_page(requset):
    try:
        first_id = News.objects.first().id
        last_news = News.objects.get(pk=first_id)
    except IndexError:
        last_news = None
    except AttributeError:
        last_news = None
    return render(requset,
                  'header/main.html',
                  context={"news": last_news})


def about_page(request):
    return render(request, 'header/about.html')


class NewsListView(ListView):
    model = News
    context_object_name = 'newses'
    template_name = 'header/news.html'
    paginate_by = 100


class QuestionListView(ListView):
    model = FAQ
    context_object_name = 'questions'
    template_name = 'header/questions.html'


def policy_view(request):
    return render(request, "header/policy.html")


class ContactsListView(ListView):
    model = EmployeesContact
    template_name = 'header/contacts.html'
    context_object_name = 'contacts'


class VacancyListView(ListView):
    model = VacancyInfo
    template_name = "header/vacancy.html"
    context_object_name = "vacancies"


class ReviewsListView(ListView):
    model = Review
    template_name = "header/review.html"
    context_object_name = 'reviews'


class CouponsListView(ListView):
    model = Coupon
    template_name = "header/coupon.html"
    context_object_name = "coupons"


def login_user(request):
    login = request.POST.get('login')
    password = request.POST.get('password')

    return JsonResponse({login: password})
