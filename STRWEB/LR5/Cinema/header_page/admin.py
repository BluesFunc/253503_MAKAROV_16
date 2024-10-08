from django.contrib import admin
from .models import (PartnerInfo, News, FAQ,CompanyInfo,
                     EmployeesContact, VacancyInfo, Review,
                     Coupon)

admin.site.register(
    [News, FAQ,
     EmployeesContact, VacancyInfo,
     Review, Coupon,CompanyInfo,PartnerInfo]
)
