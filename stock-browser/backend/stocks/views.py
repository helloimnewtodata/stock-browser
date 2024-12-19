from django.shortcuts import render

# Crerom rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
import yfinance as yf

@api_view(['GET'])
def stock_search(request):
    """
    Endpoint joka ottaa GET-parametrin ?symbol=<TICKER>
    ja palauttaa osakkeen perustiedot sekä historialliset tiedot.
    """
    symbol = request.GET.get('symbol')
    if not symbol:
        return Response({"error": "symbol parameter is required"}, status=400)

    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info  # Tämä palauttaa dictin, jossa on perustietoja osakkeesta
        history = ticker.history(period="1mo").reset_index()  # Hae viimeisen 5 päivän historialliset tiedot ja nollaa indeksi
        history['Date'] = history['Date'].astype(str)  # Muuta aikaleimat merkkijonoiksi
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
    return Response({"info": info, "history": history[['Date', 'Close']].to_dict(orient='records')}, status=200)
