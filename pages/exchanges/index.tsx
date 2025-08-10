import React, { useState, useEffect } from 'react';

// Define an interface to describe the structure of an Exchange object
interface Exchange {
  id: string;
  name: string;
  year_established: number | null;
  country: string | null;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
}

function ExchangesPage() {
  // Tell TypeScript that our state will be an array of Exchange objects
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExchanges() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/exchanges?per_page=100');
        const data: Exchange[] = await response.json(); // Specify that the fetched data is an array of Exchanges
        setExchanges(data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych o giełdach:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExchanges();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><h1>Ładowanie danych...</h1></div>;
  }

  return (
    <div>
      <h1>Giełdy Kryptowalut</h1>
      <p>Lista 100 największych giełd kryptowalut posortowana według wyniku zaufania.</p>
      
      <table className="exchanges-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Giełda</th>
            <th>Wynik Zaufania</th>
            <th>Kraj</th>
            <th>Rok Założenia</th>
            <th>Wolumen 24h (BTC)</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.map((exchange) => (
            <tr key={exchange.id}>
              <td>{exchange.trust_score_rank}</td>
              <td className="exchange-name">
                <img src={exchange.image} alt={`${exchange.name} logo`} width="24" height="24" />
                <a href={exchange.url} target="_blank" rel="noopener noreferrer">
                  {exchange.name}
                </a>
              </td>
              <td>{exchange.trust_score} / 10</td>
              <td>{exchange.country || 'N/A'}</td>
              <td>{exchange.year_established || 'N/A'}</td>
              <td>{exchange.trade_volume_24h_btc.toFixed(2)} BTC</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExchangesPage;
