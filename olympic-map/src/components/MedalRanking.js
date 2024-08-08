// src/components/MedalRanking.js
import React, { useEffect, useState } from 'react';
import './MedalRanking.css';

const MedalRanking = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://apis.codante.io/olympic-games/countries');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCountries(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="medal-ranking">
      <h2>Medal Ranking</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Country</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td>{country.rank}</td>
              <td>
                <img src={country.flag_url} alt={`${country.name} flag`} width="30" />
                {country.name}
              </td>
              <td>{country.gold_medals}</td>
              <td>{country.silver_medals}</td>
              <td>{country.bronze_medals}</td>
              <td>{country.total_medals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedalRanking;
