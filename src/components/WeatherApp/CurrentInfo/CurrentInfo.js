import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "./currentInfo.css";
import icons from "../../../assets/icons.svg";

function CurrentInfo(props) {
  let sign =
    props.currentInfo.TemperatureC > 0
      ? "+"
      : props.currentInfo.TemperatureC === 0
      ? ""
      : "-";

  return (
    <div className="info">
      <h1 className="info-location">
        <svg className="location-icon" width="18" height="26">
          <use xlinkHref={`${icons}#location`}></use>
        </svg>
        {props.locationName} {sign}
        {props.currentInfo.TemperatureC}°C
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
