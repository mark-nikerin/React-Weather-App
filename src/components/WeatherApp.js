import React from 'react';
import Search from './Search/Search';
import '../index.css'

function WeatherApp() {

  const [location, setLocation] = React.useState('');

  return (
    <div>
      <div className='main-search'>
        <h1 className='search-title'>Weather Forecast</h1>
        <Search className='search'/> 
      </div>
    </div>
  );
}

export default WeatherApp;
