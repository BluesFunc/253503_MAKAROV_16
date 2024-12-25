from django.urls import path

from . import views

urlpatterns = [
    path("", views.main_page, name="main"),
    path('about', views.about_page, name='about'),
    path('news', views.news_list, name='news'),
    path('news/<int:news_id>', views.news_page, name='news_page'),
    path('FAQ', views.QuestionListView.as_view(), name='FAQ'),
    path('contacts', views.ContactsListView.as_view(), name='contacts'),
    path('employees', views.get_employee, name='get_employees'),
    path('policy', views.policy_view, name='policy'),
    path('vacancies', views.VacancyListView.as_view(), name='vacancy'),
    path('reviews', views.ReviewsListView.as_view(), name='reviews'),
    path('reviews/add/', views.add_review, name='add_review'),
    path('coupons', views.CouponsListView.as_view(), name='coupons'),
    path("login", views.login_user, name="login"),
    path("all_tags", views.all_tags, name="all_tags"),
]
