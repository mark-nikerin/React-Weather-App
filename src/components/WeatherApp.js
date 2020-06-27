import React from "react";
import Search from "./Search/Search";
import "../index.css";

function WeatherApp() {
  const [location, setLocation] = React.useState({ LocationKey:'', LocationName:'' });

  function searchAutocomplete(location) {
    console.log(location);
    fetch(
      "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=%20cxJJEtLXIeazgfGVT1Wod8r8bPLlUxtE&q=" +
        location +
        "&language=en-US"
    )
      .then((response) => response.json())
      .then((suggest) => { 
        let result = suggest.map((x) => {
          location = {
            LocationKey: x.Key,
            LocationName: x.LocalizedName + ", " + x.Country.LocalizedName,
          }; 
           
          return location;
        });

        //console.log(result);
        setLocation(result[0])
      });
  }

  return (
    <div>
      {!location.LocationKey && (
        <div className="main-search">
          <h1 className="search-title">Weather Forecast</h1>
          <Search className="search" onSearch={searchAutocomplete} />
        </div>
      )}
      {location.LocationKey && (
        <div className="main-forecast">
          <Search className="search" onSearch={searchAutocomplete} location={location.LocationName}/>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
