import React from "react";
import sunny from "../assets/sunny.svg";

export default function Temperature({currentWeather, location}) {
  return (
    <>
    {currentWeather && <div>
         <h6 className="mt-8">{location}</h6>
      <section className="flex flex-row items-center mt-2">
        {" "}
        {/* Added items-center */}
        <h1 className="text-3xl font-bold tracking-tight text-heading">
          {currentWeather?.temperature}&deg;C
        </h1>
        {/* Reduced w-32 h-32 to match the 3xl text height */}
        <img src={sunny} className="w-10 h-10 ml-4 invert brightness-0" alt="weather icon" />
      </section>
      <section className="flex flex-row mt-2">
        <div className="w-32 flex-1">
          <h6>Wind:</h6>
          <p>{currentWeather?.windspeed} km/h</p>
        </div>
        <div className="w-32 flex-1">
          <h6>Humidity:</h6>
          <p>{currentWeather?.humidity} %</p>
        </div>
      </section>
        </div>}
     
    </>
  );
}
