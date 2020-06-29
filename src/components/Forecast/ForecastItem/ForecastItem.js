import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./forecastItem.css";
import icons from "../../../assets/weather-icons.svg";

const ForecastItem = ({ dayForecast }) => {
  const daySign =
    dayForecast.Day.Temperature.Value > 0
      ? "+"
      : dayForecast.Day.Temperature.Value === 0
      ? ""
      : "-";

  const nightSign =
    dayForecast.Night.Temperature.Value > 0
      ? "+"
      : dayForecast.Night.Temperature.Value === 0
      ? ""
      : "-";

  return (
    <div className="forecast-item">
      <div className="day-info">
        <h3>{moment(dayForecast.Date).format("dddd")}</h3>
        <p>{moment(dayForecast.Date).format("MMMM D")}</p>
      </div>
      <div className="weather-info">
        <div className="weather-item">
          <span>
            <svg width="48" height="48">
              <use xlinkHref={`${icons}#${dayForecast.Day.Icon}`}></use>
            </svg>
            {daySign}
            {Math.round(dayForecast.Day.Temperature.Value)}°
            {dayForecast.Day.Temperature.Unit}
          </span>
          <span>
            <svg width="48" height="48">
              <use xlinkHref={`${icons}#${dayForecast.Night.Icon}`}></use>
            </svg>
            {nightSign}
            {Math.round(dayForecast.Night.Temperature.Value)}°
            {dayForecast.Night.Temperature.Unit}
          </span>
        </div>
      </div>
    </div>
  );
};

ForecastItem.propTypes = {
  dayForecast: PropTypes.object.isRequired
}

export default ForecastItem;
