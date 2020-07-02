import React from "react";
import PropTypes from "prop-types";
import ForecastItem from "./ForecastItem";
import DetailsPane from "./DetailsPane"
import "./forecast.css";

function Forecast({ forecasts }) {
  const [details, setDetails] = React.useState({ id: -1, show: false, data: {} }); 

  const onDetailsOpen = (id) => {
    if (details.id && details.id === id) {
      setDetails({ id: -1, show: false, data: null });
      console.log("hide details");
    } else {
      const data = forecasts[id-1];
      console.log("open details for id " + id + ":    " + data);
      setDetails({ id: id, show: true, data: data });
    }
  };

  return (
    <React.Fragment>
      <div className="forecast">
        {forecasts.map((dayForecast, id) => {
          return (
            <ForecastItem
              dayForecast={dayForecast}
              key={id}
              id={id + 1}
              onDetailsOpen={onDetailsOpen}
            />
          );
        })}
      </div>
      {details.show && <DetailsPane details={details} />}
    </React.Fragment>
  );
}

Forecast.propTypes = {
  forecasts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Forecast;
