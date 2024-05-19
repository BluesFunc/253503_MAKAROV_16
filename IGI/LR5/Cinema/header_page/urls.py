from django.urls import path

from . import views

urlpatterns = [
    path("", views.main_page, name="main"),
    path('about', views.about_page, name='about'),
    path('news', views.NewsListView.as_view(), name='news'),
    path('FAQ', views.QuestionListView.as_view(), name='FAQ'),
    path('contacts', views.ContactsListView.as_view(), name='contacts'),
    path('policy', views.policy_view, name='policy'),
    path('vacancies', views.VacancyListView.as_view(), name='vacancy'),
    path('reviews', views.ReviewsListView.as_view(), name='review'),
    path('coupons', views.CouponsListView.as_view(), name='coupons'),
    path("login", views.login_user, name="login"),
]
