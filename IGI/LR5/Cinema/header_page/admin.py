from django.contrib import admin
from .models import (CompanyInfo, News, FAQ,
                     EmployeesContact, VacancyInfo, Review,
                     Coupon)


admin.site.register(
    [CompanyInfo, News, FAQ,
     EmployeesContact, VacancyInfo,
     Review, Coupon]
)