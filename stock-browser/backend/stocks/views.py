from django.shortcuts import render

# Crerom rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
import yfinance as yf

@api_view(['GET'])
def stock_search(request):
    """
    Endpoint joka ottaa GET-parametrin ?symbol=<TICKER>
    ja palauttaa osakkeen perustiedot.
    """
    symbol = request.GET.get('symbol')
    if not symbol:
        return Response({"error": "symbol parameter is required"}, status=400)

    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info  # Tämä palauttaa dictin, jossa on perustietoja osakkeesta
        # Tarvittaessa voi käyttäää ticker.history(...)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
    return Response(info, status=200)
