# stock_project/urls.py

from django.contrib import admin
from django.urls import path, include
from stocks.views import stock_search
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stocks.urls')),  # 'api/search/?symbol=...'
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
]
