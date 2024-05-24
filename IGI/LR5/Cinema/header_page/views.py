import datetime

from django.shortcuts import render, redirect
from django.core.cache import cache
from django.http import JsonResponse
from django.views.generic import ListView, DetailView

from .models import (FAQ, News, EmployeesContact, VacancyInfo, Review, Coupon)
from .utils import fetch_news
from .forms import ReviewForm


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


def update_news():
    api_key = '4f2ae5f80db84146ace22add8c9cc9be'
    articles = fetch_news(api_key)

    for article in articles[:10]:
        if description := article.get('description') is None:
            description = 'Подробности отсутствуют'
        News.objects.update_or_create(
            header=article.get('title'),
            defaults={
                'description': description,
                'image_url': article.get('urlToImage'),
                'post_date': article.get('publishedAt')[:10]
            }
        )


def news_list(request):
    if 'news_articles' in cache:
        news_articles = cache.get('news_articles')
    else:
        update_news()
        news_articles = News.objects.all().order_by('-post_date')[:10]
        cache.set('news_articles', news_articles, 60 * 60)
    return render(request, 'header/news.html', {'news_articles': news_articles})


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
