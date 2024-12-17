# stocks/admin.py

from django.contrib import admin
from .models import Stock, PriceData, FinancialData

admin.site.register(Stock)
admin.site.register(PriceData)
admin.site.register(FinancialData)
