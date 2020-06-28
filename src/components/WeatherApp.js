import React from "react";
import PropTypes from "prop-types";
import Search from "./Search/Search";
import Info from "./Info/Info";
import "../index.css";

function WeatherApp() {
  const [locationInfo, setLocationInfo] = React.useState({
    LocationKey: "",
    LocationName: "",
  });

  const [currentInfo, setCurrentInfo] = React.useState();

  function getLocationInfo(query) {
    fetch(
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=%20cxJJEtLXIeazgfGVT1Wod8r8bPLlUxtE&q=" +
        query +
        "&language=en-US"
    )
      .then((response) => response.json())
      .then((suggest) => {
        let result = suggest.map((x) => {
          let location = {
            LocationKey: x.Key,
            LocationName: x.LocalizedName + ", " + x.Country.LocalizedName,
          };

          return location;
        });

        let locationInfo = result[0];

        if (locationInfo) {
          setLocationInfo(result[0]);
          getCurrentInfo(result[0].LocationKey);
        }
      });
  }

  function getCurrentInfo(locationKey) {
    fetch(
      "http://dataservice.accuweather.com/currentconditions/v1/" +
        locationKey +
        "?apikey=cxJJEtLXIeazgfGVT1Wod8r8bPLlUxtE"
    )
      .then((response) => response.json())
      .then((conditions) => {
        let result = conditions.map((x) => {
          let condition = {
            LocalObservationDateTime: x.LocalObservationDateTime,
            WeatherIcon: x.WeatherIcon,
            IsDayTime: x.IsDayTime,
            TemperatureC: x.Temperature.Metric.Value,
            TemperatureF: x.Temperature.Imperial.Value,
          };
          return condition;
        });

        console.log("CurrentInfo");
        console.log(result[0]);
        setCurrentInfo(result[0]);
      });
  }

  getLocationInfo.propTypes = {
    location: PropTypes.string.isRequired,
  };

  getCurrentInfo.propTypes = {
    locationKey: PropTypes.string.isRequired,
  };

  return (
    <div>
      {!locationInfo.LocationKey && !currentInfo && (
        <div className="main-search">
          <h1 className="search-title">Weather Forecast</h1>
          <Search className="search" onSearch={getLocationInfo} />
        </div>
      )}
      {locationInfo.LocationKey && currentInfo && (
        <div className="main-forecast">
          <Search
            className="search"
            onSearch={getLocationInfo}
            location={locationInfo.LocationName}
          />
          <Info
            currentInfo={currentInfo}
            locationName={locationInfo.LocationName}
          ></Info>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
