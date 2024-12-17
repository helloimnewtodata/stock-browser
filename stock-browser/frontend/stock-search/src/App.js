import React, { useState } from 'react';
import axios from 'axios';

// Tuodaan shadcn/ui komponentit
import Button from "./components/ui/button"
import Input from "./components/ui/input"
import Card from "./components/ui/card"

function App() {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStockData = async () => {
      if (!symbol) {
        setError('Syötä osakesymboli.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`http://localhost:8000/api/search/?symbol=${symbol}`);
        setStockData(response.data); // Tallenna saatu data
      } catch (err) {
        setError('Virhe haettaessa tietoja. Tarkista symboli ja yritä uudelleen.');
        setStockData(null);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="text-3xl font-bold mb-5 text-center text-gray-900">Stock Search</h1>
            <div className="mb-5 flex space-x-2">
              <Input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Syötä osakesymboli (esim. AAPL)"
                className="flex-grow"
              />
              <Button onClick={fetchStockData} disabled={loading}>
                {loading ? 'Haetaan...' : 'Hae'}
              </Button>
            </div>
            {error && <p className="text-red-500 mb-5">{error}</p>}
            {stockData && (
              <Card className="mb-4">
                <h2 className="font-bold text-xl">{stockData.longName} ({stockData.symbol})</h2>
                <p className="text-2xl font-bold">${stockData.currentPrice}</p>
                <p><strong>Sector:</strong> {stockData.sector}</p>
                <p><strong>Industry:</strong> {stockData.industry}</p>
                <p><strong>Previous Close:</strong> ${stockData.previousClose}</p>
                <p><strong>Market Cap:</strong> ${stockData.marketCap}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
}

export default App;
