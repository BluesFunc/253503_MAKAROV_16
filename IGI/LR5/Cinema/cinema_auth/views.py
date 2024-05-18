from django.shortcuts import render
from django.http import JsonResponse

def main_page(request):
    return render(request, 'index.html')


def login_user(request):
    login = request.GET.get('login', '')
    password = request.GET.get('password', '')

    return JsonResponse({login: password})