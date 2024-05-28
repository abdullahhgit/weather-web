import React from 'react';
import { Oval } from 'react-loader-spinner';

const WeatherDisplay = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Oval
            height={80}
            width={80}
            color="#fff"
            ariaLabel="loading"
          />
        </div>
      );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className='no-data'>
                No data available
                <p>Enter city name and Press Search icon OR press enter to see weather information</p>
            </div>;
  }

  const images = require.context('../assets/images', false, /\.(png|jpe?g|svg)$/);

   const getWeatherIcon = (iconCode) => {
    try {
      return images(`./${iconCode}.png`);
    } catch (err) {
      console.error(`Image for icon code ${iconCode} not found.`);
      return null;
    }
  };

  const weatherIcon = getWeatherIcon(weatherData.weather[0].icon);

  const convertTimezone = (timestamp, offset) => {
    const localTime = new Date((timestamp + offset) * 1000);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC'  
    };

    return new Intl.DateTimeFormat('en-US', options).format(localTime);
  };

  const localTime = convertTimezone(weatherData.dt, weatherData.timezone);

  return (
    <>
    <div className="weather__body">
        <h1 className="weather__city">{weatherData.name}</h1>
        <div className="weather__datetime">
            {localTime}
        </div>
        <div className="weather__forecast">{weatherData.weather[0].description}</div>
        <div className="weather__icon">
            {weatherIcon && <img src={weatherIcon} alt="weather icon" />}
        </div>
        <p className="weather__temperature">
         {weatherData.main.temp} °C
        </p>
        <div className="weather__minmax">
            <p>Min: {weatherData.main.temp_min} °C</p>
            <p>Max: {weatherData.main.temp_max} °C</p>
        </div>
    </div>

    <div className="weather__info">
        <div className="weather__card">
            <i className="fa-solid fa-temperature-full"></i>
            <div>
                <p>Feels Like</p>
                <p className="weather__realfeel">{weatherData.main.feels_like} °C</p>
            </div>
        </div>
        <div className="weather__card">
            <i className="fa-solid fa-droplet"></i>
            <div>
                <p>Humidity</p>
                <p className="weather__humidity">{weatherData.main.humidity} %</p>
            </div>
        </div>
        <div className="weather__card">
            <i className="fa-solid fa-wind"></i>
            <div>
                <p>Wind</p>
                <p className="weather__wind">{weatherData.wind.speed} %</p>
            </div>
        </div>
        <div className="weather__card">
            <i className="fa-solid fa-gauge-high"></i>
            <div>
                <p>Pressure</p>
                <p className="weather__pressure">{weatherData.main.pressure} hPa</p>
            </div>
        </div>
    </div>
    </>
  );
};

export default WeatherDisplay;
