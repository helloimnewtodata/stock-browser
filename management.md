Selitys:

admin.py: Määrittelee, miten mallit näkyvät Django admin -käyttöliittymässä.
apps.py: Konfiguroi sovelluksen asetukset.

management/commands/fetch_stock_data.py: Sisältää mukautetun hallintakomennon, jota käytät datan hakemiseen Yahoo Finance -kirjastolla.

models.py: Määrittelee tietokantamallit (Stock, PriceData, FinancialData).
serializers.py: (Jos käytät Django REST Frameworkia) Määrittelee serializerit mallien muuntamiseksi JSON-muotoon.

tests.py: Sisältää testit sovelluksellesi.

urls.py: Määrittelee sovelluksen URL-polut.

views.py: Määrittelee näkymät (views) sovelluksellesi.

stock_project/settings.py: Määrittelee sovelluksen asetukset.

stock_project/urls.py: Määrittelee sovelluksen URL-polut.

stock_project/wsgi.py: Määrittelee WSGI-sovelluksen.

stock_project/asgi.py: Määrittelee ASGI-sovelluksen.
