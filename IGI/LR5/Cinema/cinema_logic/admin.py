from django.contrib import admin

from .models import (Movie,Ticket,
                     Place,Hall,
                     Show,Order,Customer
                     )

admin.site.register([Movie,Ticket,Place,Hall,Show,Order, Customer])
