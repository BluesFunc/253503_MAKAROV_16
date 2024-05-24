from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login_form, name='login'),
    path('logout', views.logout_user, name='logout'),
    path("registration", views.register_form, name='register'),
    path("reg", views.register_user, name='reg'),
    path("shows", views.show_list, name='show_list'),
    path("show/<int:show_id>/", views.show_detail, name='show_detail'),
    path('shows/<int:show_id>/purchase/', views.purchase_tickets, name='purchase_tickets'),
    path('movies/', views.movie_list, name='movie_list'),
    path('movies/add/', views.add_movie, name='add_movie'),
    path('movies/<int:movie_id>/edit/', views.edit_movie, name='edit_movie'),
    path('movies/<int:movie_id>/delete/', views.delete_movie, name='delete_movie'),
    path('statistics/', views.sales_statistics, name='ticket_statistics'),
    path('employee/', views.employee_page, name='employee_page'),
    path('orders/', views.user_orders, name='user_orders'),
    path('shows/<int:show_id>/tickets/', views.show_order_tickets, name='show_tickets'),
    path("auth", views.login_user, name='auth')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
