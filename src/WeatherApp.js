import React from "react";
import PropTypes from "prop-types";
import Search from "./components/Search";
import CurrentInfo from "./components/CurrentInfo";
import Forecast from "./components/Forecast";
import "./weatherApp.css";

const WeatherApp = () => {
  const [locationInfo, setLocationInfo] = React.useState({
    LocationKey: "",
    LocationName: "",
  });

  const [currentInfo, setCurrentInfo] = React.useState();

  const [dailyForecast, setDailyForecast] = React.useState([]);

  const getIcon = (id) => {
    let iconId;

    switch (id) {
      case 1:
      case 2:
      case 30:
        iconId = "clear-day";
        break;
      case 3:
      case 4:
      case 5:
        iconId = "clear-cloudy-day";
        break;
      case 6:
        iconId = "partly-cloudy-day";
        break;
      case 7:
      case 8:
      case 11:
        iconId = "cloudy";
        break;
      case 12:
      case 18:
        iconId = "showers";
        break;
      case 13:
      case 14:
        iconId = "drizzle-day";
        break;
      case 15:
      case 16:
      case 17:
        iconId = "thunderstroms";
        break;
      case 19:
      case 20:
      case 21:
      case 43:
        iconId = "snow-flurries";
        break;
      case 22:
      case 23:
      case 24:
      case 44:
        iconId = "snow";
        break;
      case 25:
      case 26:
      case 29:
        iconId = "sleet";
        break;
      case 31:
      case 33:
      case 34:
        iconId = "clear-night";
        break;
      case 32:
        iconId = "windy";
        break;
      case 35:
      case 36:
      case 37:
        iconId = "clear-cloudy-night";
        break;
      case 38:
        iconId = "partly-cloudy-night";
        break;
      case 39:
      case 40:
        iconId = "drizzle-night";
        break;
      case 41:
      case 42:
        iconId = "thunderstroms";
        break;
      default:
        iconId = "clear-day";
    }

    return iconId;
  };

  const getLocationInfo = (locationQuery) => {
    console.log(locationQuery);
    fetch(
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=%20cxJJEtLXIeazgfGVT1Wod8r8bPLlUxtE&q=" +
        locationQuery +
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
          setLocationInfo(locationInfo);
          getCurrentInfo(locationInfo.LocationKey);
        }
      });
  };

  const getCurrentInfo = (locationKey) => {
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
            WeatherIcon: getIcon(x.WeatherIcon),
            IsDayTime: x.IsDayTime,
            Temperature: {
              Imperial: {
                Value: x.Temperature.Imperial.Value,
                Unit: x.Temperature.Imperial.Unit,
              },
              Metric: {
                Value: x.Temperature.Metric.Value,
                Unit: x.Temperature.Metric.Unit,
              },
            },
          };
          return condition;
        });

        setCurrentInfo(result[0]);
        getDailyForecast(locationKey);
      });
  };

  const getDailyForecast = (locationKey) => {
    fetch(
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
        locationKey +
        "?apikey=cxJJEtLXIeazgfGVT1Wod8r8bPLlUxtE&language=en-US&details=true&metric=true"
    )
      .then((response) => response.json())
      .then((forecast) => {
        let result = forecast.DailyForecasts.map((x) => {
          let dayForecast = {
            Date: x.Date,
            Day: {
              Icon: getIcon(x.Day.Icon),
              Phrase: x.Day.ShortPhrase,
              Temperature: {
                Value: x.Temperature.Maximum.Value,
                Unit: x.Temperature.Maximum.Unit,
              },
              Wind: {
                SpeedValue: x.Day.Wind.Speed.Value,
                SpeedUnit: x.Day.Wind.Speed.Unit,
                DirectionDegrees: x.Day.Wind.Direction.Degrees,
                DirectionName: x.Day.Wind.Direction.Localized,
              },
            },
            Night: {
              Icon: getIcon(x.Night.Icon),
              Phrase: x.Night.ShortPhrase,
              Temperature: {
                Value: x.Temperature.Minimum.Value,
                Unit: x.Temperature.Minimum.Unit,
              },
              Wind: {
                SpeedValue: x.Night.Wind.Speed.Value,
                SpeedUnit: x.Night.Wind.Speed.Unit,
                DirectionDegrees: x.Night.Wind.Direction.Degrees,
                DirectionName: x.Night.Wind.Direction.Localized,
              },
            },
          };
          return dayForecast;
        });
        setDailyForecast(result);
      });
  };

  getIcon.propTypes = {
    id: PropTypes.number.isRequired,
  };
  getLocationInfo.propTypes = {
    location: PropTypes.string.isRequired,
  };
  getCurrentInfo.propTypes = {
    locationKey: PropTypes.string.isRequired,
  };
  getDailyForecast.propTypes = {
    locationKey: PropTypes.string.isRequired,
  };

  return (
    <div className="main">
      {locationInfo.LocationKey && currentInfo ? (
        <div>
          <Search
            className="search"
            onSearch={getLocationInfo}
            location={locationInfo.LocationName}
          />
          <CurrentInfo
            currentInfo={currentInfo}
            locationName={locationInfo.LocationName}
          />
          <Forecast forecasts={dailyForecast} />
        </div>
      ) : (
        <div>
          <h1 className="search-title">Weather Forecast</h1>
          <Search className="search" onSearch={getLocationInfo} />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
