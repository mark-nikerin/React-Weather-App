import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./detailsPane.css";
import icons from "../../../assets/weather-icons.svg";

const DetailsPane = ({ details }) => {
  const daySign =
    details.Day.Temperature.Value > 0
      ? "+"
      : details.Day.Temperature.Value === 0
      ? ""
      : "-";

  const nightSign =
    details.Night.Temperature.Value > 0
      ? "+"
      : details.Night.Temperature.Value === 0
      ? ""
      : "-";

  const daySignFeel =
    details.Day.Temperature.RealFeelValue > 0
      ? "+"
      : details.Day.Temperature.RealFeelValue === 0
      ? ""
      : "-";

  const nightSignFeel =
    details.Night.Temperature.RealFeelValue > 0
      ? "+"
      : details.Night.Temperature.RealFeelValue === 0
      ? ""
      : "-";

  return (
    <div className="details-pane">
      <div className="temperatures">
        <div className="temperatures-item">
          <div className="weather">
            <svg width="48" height="48">
              <use xlinkHref={`${icons}#${details.Day.Icon}`}></use>
            </svg>
            <p>
              {daySign}
              {Math.round(details.Day.Temperature.Value)}°
              {details.Day.Temperature.Unit}
            </p>
          </div>
          <div className="feels-like">
            <p>{details.Day.Phrase}</p>
            <p>
              Feels like:
              {daySignFeel}
              {Math.round(details.Day.Temperature.RealFeelValue)}°
              {details.Day.Temperature.Unit}
            </p>
          </div>
        </div>
        <div className="temperatures-item">
          <div className="weather">
            <svg width="48" height="48">
              <use xlinkHref={`${icons}#${details.Night.Icon}`}></use>
            </svg>
            <p>
              {nightSign}
              {Math.round(details.Night.Temperature.Value)}°
              {details.Night.Temperature.Unit}
            </p>
          </div>
          <div className="feels-like">
            <p>{details.Night.Phrase}</p>
            <p>
              Feels like:
              {nightSignFeel}
              {Math.round(details.Night.Temperature.RealFeelValue)}°
              {details.Night.Temperature.Unit}
            </p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="statistics">
        <div className="statistics-item">
        <p>
            Rain probability: {details.Day.RainProbability}%
          </p>
          <p>  
            Cloud cover: {details.Day.CloudCover}%
          </p>
        </div>
        <div className="statistics-item">
          <p>
            Rain probability: {details.Night.RainProbability}%
          </p>
          <p>  
            Cloud cover: {details.Night.CloudCover}%
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="set-rise">
        <div className="set-rise-item">
          <svg className="sun-icon" width="48" height="48">
            <use xlinkHref={`${icons}#sun-rise`}></use>
          </svg>
          <p>{moment(details.Sun.Rise).format("h:mm a").toUpperCase()}</p>
        </div>
        <div className="set-rise-item">
          <svg className="sun-icon" width="48" height="48">
            <use xlinkHref={`${icons}#sun-set`}></use>
          </svg>
          <p>{moment(details.Sun.Set).format("h:mm a").toUpperCase()}</p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="set-rise">
        <div className="set-rise-item">
          <svg className="moon-icon" width="42" height="42">
            <use xlinkHref={`${icons}#moon-rise`}></use>
          </svg>
          <p>{moment(details.Moon.Rise).format("h:mm a").toUpperCase()}</p>
        </div>
        <div className="set-rise-item">
          <svg className="moon-icon" width="42" height="42">
            <use xlinkHref={`${icons}#moon-set`}></use>
          </svg>
          <p>{moment(details.Moon.Set).format("h:mm a").toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

DetailsPane.propTypes = {
  details: PropTypes.object.isRequired,
};

export default DetailsPane;
