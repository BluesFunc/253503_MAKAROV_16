from django import forms
from .models import Ticket, Movie
from header_page.models import Coupon


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


class RegisterForm(forms.Form):
    user_email = forms.EmailField()
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
    repeat_password = forms.CharField(widget=forms.PasswordInput)
    TYPES = (
        ("Customer", "Покупатель"),
        ("Employee", "Работник")
    )
    role = forms.CharField(widget=forms.RadioSelect(choices=TYPES))


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ['name', 'country', 'genre', 'duration', 'description', 'rating']


class CouponForm(forms.Form):
    code = forms.CharField(max_length=20, label='Промокод', required=False)


class PurchaseTicketForm(forms.Form):
    tickets = forms.ChoiceField()
    code = forms.CharField(max_length=20, required=False, label='Введите промокод')

    def __init__(self, *args, show=None, **kwargs):
        super(PurchaseTicketForm, self).__init__(*args, **kwargs)
        if show is not None:
            tickets = Ticket.objects.filter(show=show, order=None)
            tickets_set = set()
            for ticket in tickets:
                tickets_set.add((ticket.id, ticket))
            self.fields['tickets'].choices = tickets_set
