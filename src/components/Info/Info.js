import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import "../Info/info.css";
import icons from "../../assets/icons.svg";

function Info(props) {
  const [currentInfo, locationName] = props;

  let sign =
    currentInfo.TemperatureC > 0
      ? "+"
      : currentInfo.TemperatureC === 0
      ? ""
      : "-";

  return (
    <div className="info">
      <h1 className="info-location">
        <svg className="location-icon" width="18" height="26">
          <use xlinkHref={`${icons}#location`}></use>
        </svg>
        {locationName} {sign}
        {currentInfo.TemperatureC}°C
      </h1>
      <h2 className="info-date">
        {" "}
        {moment(currentInfo.LocalObservationDateTime).format("dddd, MMMM D")}
      </h2>
    </div>
  );
}

Info.propTypes = {
  currentInfo: PropTypes.object,
  locationName: PropTypes.string,
};

export default Info;
