# stocks/urls.py

from django.urls import path
from .views import stock_search

urlpatterns = [
    path('search/', stock_search, name='stock_search'),
]
