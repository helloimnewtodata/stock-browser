import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = ({ priceData }) => {
  // Tarkista, että priceData on määritelty ja ei tyhjää
  if (!priceData || priceData.length === 0) {
    return <p>Ei saatavilla hintatietoja.</p>;
  }

  const data = {
    labels: priceData.map((data) => {
      const date = new Date(data.date);
      return date.toLocaleDateString('fi-FI', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Sulkuhinta ($)',
        data: priceData.map((data) => data.close),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PriceChart;