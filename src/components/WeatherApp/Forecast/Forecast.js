import React from 'react';  
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import './forecast.css';

function Forecast({forecasts}) {
  return (
    <div className='forecast'>  
      {forecasts.map((dayForecast, id) => {
          return (
            <ForecastItem
              dayForecast={dayForecast} 
              key={id} 
            />
          );
        })} 
    </div>
  );
}

Forecast.propTypes = { 
}

export default Forecast;
