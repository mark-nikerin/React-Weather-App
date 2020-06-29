import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "./currentInfo.css";
import icons from "../../../assets/icons.svg";
import weatherIcons from "../../../assets/weather-icons.svg";

function CurrentInfo(props) {
  const temp = props.currentInfo.Temperature.Metric;
  let sign = temp.Value > 0 ? "+" : temp.Value === 0 ? "" : "-";

  return (
    <div className="info">
      <h1 className="info-location">
        <svg className="location-icon" width="18" height="26">
          <use xlinkHref={`${icons}#location`}></use>
        </svg>
        {props.locationName}
        <svg className="weather-icon" width="48" height="48">
          <use xlinkHref={`${weatherIcons}#${props.currentInfo.WeatherIcon}`}></use>
        </svg>
        {sign}
        {temp.Value}°{temp.Unit}
      </h1>
      <h2 className="info-date">
        {moment(props.currentInfo.LocalObservationDateTime).format("dddd, MMMM D")}
      </h2>
    </div>
  );
}

CurrentInfo.propTypes = {
  currentInfo: PropTypes.object,
  locationName: PropTypes.string,
};

export default CurrentInfo;
