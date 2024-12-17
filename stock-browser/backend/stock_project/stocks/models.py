# stocks/models.py

from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    sector = models.CharField(max_length=100, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    current_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Uusi kenttä

    def __str__(self):
        return f"{self.symbol} - {self.name}"

class PriceData(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, related_name='price_data')
    date = models.DateField()
    open = models.DecimalField(max_digits=10, decimal_places=2)
    close = models.DecimalField(max_digits=10, decimal_places=2)
    high = models.DecimalField(max_digits=10, decimal_places=2)
    low = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.BigIntegerField()

    class Meta:
        unique_together = ('stock', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.stock.symbol} - {self.date}"

class FinancialData(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, related_name='financial_data')
    year = models.IntegerField()
    revenue = models.DecimalField(max_digits=20, decimal_places=2)
    net_income = models.DecimalField(max_digits=20, decimal_places=2)
    pe_ratio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        unique_together = ('stock', 'year')
        ordering = ['-year']

    def __str__(self):
        return f"{self.stock.symbol} - {self.year}"
