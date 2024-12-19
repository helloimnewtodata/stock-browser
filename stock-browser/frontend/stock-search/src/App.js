import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PriceChart from './components/PriceChart';
import Button from "./components/ui/button";
import Card from "./components/ui/card";

function App() {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [priceData, setPriceData] = useState([]);

    const fetchStockData = async () => {
        if (!symbol) {
            setError('Syötä osakesymboli.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:8000/api/search/?symbol=${symbol}`);
            console.log("Ticker Info:", response.data.info);
            console.log("Ticker History:", response.data.history);
            setStockData(response.data); // Tallenna koko stockData
            setPriceData(formatStockData(response.data)); // Muunna ja tallenna hintatiedot
        } catch (err) {
            setError('Virhe haettaessa tietoja. Tarkista symboli ja yritä uudelleen.');
            setStockData(null);
            setPriceData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchStockData();
        }
    };

    useEffect(() => {
        setStockData(null);
    }, [symbol]);

    const formatStockData = (data) => {
        const history = data.history.map(item => ({
            date: item.Date,
            close: item.Close,
            open: item.Open,
            high: item.High,
            low: item.Low,
            volume: item.Volume,
        }));
        return history;
    };

    console.log("Price Data:", priceData);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-3xl font-bold mb-5 text-center text-gray-900">Stock Search</h1>
                    <div className="mb-5 flex space-x-2">
                        <input
                            type="text"
                            id="stock-symbol"
                            name="stock-symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Syötä osakesymboli (esim. AAPL)"
                            className="flex-grow"
                        />
                        <Button onClick={fetchStockData} disabled={loading}>
                            {loading ? 'Haetaan...' : 'Hae'}
                        </Button>
                    </div>
                    {error && <p className="text-red-500 mb-5">{error}</p>}
                    {stockData && stockData.info && (
                        <Card className="mb-4">
                            <h2 className="font-bold text-xl">{stockData.info.longName} ({stockData.info.symbol})</h2>
                            <p className="text-2xl font-bold">${stockData.info.currentPrice || priceData[priceData.length - 1].close}</p>
                            <p><strong>Sector:</strong> {stockData.info.sector}</p>
                            <p><strong>Industry:</strong> {stockData.info.industry}</p>
                            <p><strong>Previous Close:</strong> ${stockData.info.previousClose}</p>
                            <p><strong>Market Cap:</strong> ${stockData.info.marketCap}</p>
                        </Card>
                    )}
                    {priceData && priceData.length > 0 && <PriceChart priceData={priceData} />}
                </div>
            </div>
        </div>
    );
}

export default App;
