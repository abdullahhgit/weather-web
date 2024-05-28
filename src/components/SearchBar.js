import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form className="weather__search">
        <input 
          type="text" 
          placeholder="Enter city name" 
          className="weather__searchform" 
          value={city}
          onChange={(e) => setCity(e.target.value)} 
        />
        <button onClick={handleSearch}>
         <i className="fa-solid fa-magnifying-glass"></i>
        </button>
    </form> 
  );
};

export default SearchBar;
