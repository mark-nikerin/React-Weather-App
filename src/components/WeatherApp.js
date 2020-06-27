import React from 'react';
import Search from './Search/Search';
import '../index.css'

function WeatherApp() {
  return (
    <div>
      <h1 className='search-title'>Weather Forecast</h1>
      <Search className='search'/> 
    </div>
  );
}

export default WeatherApp;
