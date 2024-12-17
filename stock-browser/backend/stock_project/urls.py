# stock_project/urls.py

from django.contrib import admin
from django.urls import path, include
from stocks.views import stock_search

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stocks.urls')),  # 'api/search/?symbol=...'
]
