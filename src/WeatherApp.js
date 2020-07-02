import React from "react";
import PropTypes from "prop-types";
import { useAlert } from "react-alert";
import Search from "./components/Search";
import Loader from "./components/Loader";
import "./weatherApp.css";

const WeatherApp = () => {
  const CurrentInfo = React.lazy(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(import("./components/CurrentInfo")), 500)
      )
  );

  const Forecast = React.lazy(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(import("./components/Forecast")), 500)
      )
  );

  const API_KEY = process.env.REACT_APP_YOUR_API_KEY_NAME;

  const alert = useAlert();

  const [status, setStatus] = React.useState({
    isLoading: false,
    error: false,
  });

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
    fetch(
      "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" +
        API_KEY +
        "&q=" +
        locationQuery +
        "&language=en-US"
    )
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }
        setStatus({ isLoading: true, error: false });
        return response.json();
      })
      .then((suggestions) => {
        const result = suggestions.map((x) => {
          const location = {
            LocationKey: x.Key,
            LocationName: x.LocalizedName + ", " + x.Country.LocalizedName,
          };

          return location;
        });

        const locationInfo = result[0];

        if (locationInfo) {
          setLocationInfo(locationInfo);
          setStatus({ isLoading: false, error: false });
          getCurrentInfo(locationInfo.LocationKey);
        } else {
          alert.show("Сity not found. Let's try again!", {
            title: "Nothing found",
          });
          setStatus({ isLoading: false, error: true });
        }
      })
      .catch(() => {
        alert.show("Looks like the AccuWeather API limit has been reached. \nDon’t be sad, come back tomorrow and try again!", {
          title: "Something is wrong",
        });
        setStatus({ isLoading: false, error: true });
      });
  };

  const getCurrentInfo = (locationKey) => {
    fetch(
      "https://dataservice.accuweather.com/currentconditions/v1/" +
        locationKey +
        "?apikey=" +
        API_KEY
    )
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }
        setStatus({ isLoading: true, error: false });
        return response.json();
      })
      .then((conditions) => {
        const result = conditions.map((x) => {
          const condition = {
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
        if (result) {
          setCurrentInfo(result[0]);
          setStatus({ isLoading: false, error: false });
          getDailyForecast(locationKey);
        } else {
          alert.show("Forecast not found", {
            title: "Not found",
          });
          setStatus({ isLoading: false, error: true });
        }
      })
      .catch(() => {
        setStatus({ isLoading: false, error: true });
      });
  };

  const getDailyForecast = (locationKey) => {
    fetch(
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
        locationKey +
        "?apikey=" +
        API_KEY +
        "&language=en-US&details=true&metric=true"
    )
      .then((response) => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }
        setStatus({ isLoading: true, error: false });
        return response.json();
      })
      .then((forecast) => {
        let result = forecast.DailyForecasts.map((x) => {
          let dayForecast = {
            Date: x.Date,
            Day: {
              Icon: getIcon(x.Day.Icon),
              Phrase: x.Day.IconPhrase,
              RainProbability: x.Day.RainProbability,
              CloudCover: x.Day.CloudCover,
              Temperature: {
                Value: x.Temperature.Maximum.Value,
                RealFeelValue: x.RealFeelTemperature.Maximum.Value,
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
              Phrase: x.Night.IconPhrase,
              RainProbability: x.Night.RainProbability,
              CloudCover: x.Night.CloudCover,
              Temperature: {
                Value: x.Temperature.Minimum.Value,
                RealFeelValue: x.RealFeelTemperature.Minimum.Value,
                Unit: x.Temperature.Minimum.Unit,
              },
              Wind: {
                SpeedValue: x.Night.Wind.Speed.Value,
                SpeedUnit: x.Night.Wind.Speed.Unit,
                DirectionDegrees: x.Night.Wind.Direction.Degrees,
                DirectionName: x.Night.Wind.Direction.Localized,
              },
            },
            Sun: {
              Rise: x.Sun.Rise,
              Set: x.Sun.Set,
            },
            Moon: {
              Rise: x.Moon.Rise,
              Set: x.Moon.Set,
            },
          };
          return dayForecast;
        });
        if (result) {
          setDailyForecast(result);
          setStatus({ isLoading: false, error: false });
        } else {
          alert.show("Forecast not found", {
            title: "Not found",
          });
          setStatus({ isLoading: false, error: true });
        }
      })
      .catch(() => {
        setStatus({ isLoading: false, error: true });
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
    <React.Fragment>
      <div className="main"> 
        {!status.error && currentInfo && (
          <div>
            {!status.isLoading && (
              <div>
                <React.Suspense fallback={<Loader />}>
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
                </React.Suspense>
              </div>
            )}
            {status.isLoading && <Loader />}
          </div>
        )}
        {!status.isLoading && !status.error && !currentInfo && (
          <div>
            <h1 className="search-title">Weather Forecast</h1>
            <Search className="search" onSearch={getLocationInfo} />
            {status.isLoading && <Loader />}
          </div>
        )} 
        {status.error && (
          <div>
            <h1 className="search-title">Weather Forecast</h1>
            <Search className="search" onSearch={getLocationInfo} />
          </div>
        )}
      </div>
      <div className="api-provider">
        <a href="https://www.accuweather.com/"><p>Powered by AccuWeather</p></a>
      </div>
      <div className="footer"></div>
    </React.Fragment>
  );
};

export default WeatherApp;
