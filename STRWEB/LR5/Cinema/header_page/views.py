import datetime

from django.core import serializers
from django.shortcuts import render, redirect
from django.core.cache import cache
from django.http import JsonResponse
from django.views.generic import ListView, DetailView

from .models import (FAQ, News, EmployeesContact, VacancyInfo, Review, Coupon, PartnerInfo, CompanyInfo,)
from cinema_logic.models import Show
from .utils import fetch_news
from .forms import ReviewForm


def main_page(requset):
    try:
        count = range(5)
        last_news = News.objects.get(id=164)
        partners = PartnerInfo.objects.all()
        
    except IndexError:
        last_news = None
        partners = None

    except AttributeError:
        last_news = None
        partners = None
    return render(requset,
                  'header/main.html',
                  context={"news": last_news, "partners": partners, "range": count})


def about_page(request):
    about = CompanyInfo.objects.get(pk=1)
    return render(request, 'header/about.html', context={"about":about})


def update_news():
    api_key = '4f2ae5f80db84146ace22add8c9cc9be'
    articles = fetch_news(api_key)
    news = []
    for article in articles[:10]:
        if article.get('content') is None:
            continue
        else:
            content = article.get('description')
        link = article.get('url')

        news.append(News.objects.update_or_create(
            header=article.get('title'),
            link=link,
            defaults={
                'description': content,
                'image_url': article.get('urlToImage'),
                'post_date': article.get('publishedAt')[:10],
            }
        )[0]
        )
    return news


def news_list(request):
    news_articles = News.objects.all().order_by("-post_date")[:10]
    return render(request, 'header/news.html', {'news_articles': news_articles})

def news_page(request, news_id):
    news = News.objects.get(pk=news_id)
    return render(request, 'header/news_page.html', {'news': news})


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

def get_employee(request):
    employees = EmployeesContact.objects.all()
    data = serializers.serialize('json', employees)
    return JsonResponse({"data": data})


class VacancyListView(ListView):
    model = VacancyInfo
    template_name = "header/vacancy.html"
    context_object_name = "vacancies"


class ReviewsListView(ListView):
    model = Review
    template_name = "header/review.html"
    context_object_name = 'reviews'


def add_review(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.issuer = request.user
            review.post_data = datetime.date.today()
            review.save()
            return redirect('reviews')
    else:
        form = ReviewForm()
    return render(request, 'header/add_review.html', {'form': form})


class CouponsListView(ListView):
    model = Coupon
    template_name = "header/coupon.html"
    context_object_name = "coupons"


def login_user(request):
    login = request.POST.get('login')
    password = request.POST.get('password')

    return JsonResponse({login: password})

def all_tags(request):
    return render(request, "header/all_tags.html")
