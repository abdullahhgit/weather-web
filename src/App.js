import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
          setWeatherData(response.data);
        } catch (err) {
          setError('Failed to fetch weather data');
        }
        setLoading(false);
      };

      fetchWeatherData();
    }
  }, [city, API_KEY]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="weather__header">
          <SearchBar onSearch={handleSearch} />
        </div>
        <WeatherDisplay weatherData={weatherData} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default App;
