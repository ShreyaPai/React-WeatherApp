import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Temperature from "./Temperature";
import { getLatLngByLocName, getWeatherData } from "../http/http";

export default function WeatherCard() {
  const [searchLocation, setSearchLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)

  const errorHandler = () =>{
    setIsError(true)
  }

  useEffect(() => {
    const showWeather = async () => {

      try {
        if (searchLocation) {
                  setIsLoading(true);

          const response = await getLatLngByLocName(searchLocation);

          const { properties } = response.features[0];
          const { lat, lon } = properties;
          console.log(lat + " " + lon);
          const weatherData = await getWeatherData(lat, lon);
          console.log("weatherData :>> ", weatherData);
          let { current_weather, hourly } = weatherData;
          current_weather = {
            ...current_weather,
            humidity: hourly.relativehumidity_2m[0],
          };
          setWeatherData(current_weather);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    };

    showWeather();
  }, [searchLocation]);

  const locationToSearch = (value) => {
    setSearchLocation(value);
  };

  return (
    <>
      <div className="flex items-center justify-center m-4 bg-slate-50">
        <div
          className="rounded-[1em] p-8 shadow-2xl text-white font-medium
                bg-linear-to-br from-cyan-500 to-blue-600"
        >
          <SearchBar onSearch={locationToSearch} initialLoc={ weatherData && '' } onError={errorHandler} />
         {
          !isError && <section>
            {isLoading ? (
              <div role="status">
                <h3>
                 Loading...
                </h3>
              </div>
            ) : (
              <Temperature
              onError={errorHandler}
                currentWeather={weatherData}
                location={searchLocation}
              />
            )}
          </section>
         } 
         {
          isError && <p>Oops, something went wrong</p>
         }
        </div>
      </div>
    </>
  );
}
