import React, { useEffect, useState } from "react";
import { getLocations } from "../http/http";

export default function SearchBar({ onSearch, initialLoc = "", onError }) {
  const [locationName, setLocationName] = useState(initialLoc);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchLocation = setTimeout(async () => {
      if (!locationName || locationName.length < 3) return;
      try {
        const data = await getLocations(locationName);
        console.log("data :>> ", data);
        const { results } = data;
        const allMatchingLocations = results.filter((res) => res.formatted);
        setSearchResults(allMatchingLocations);
      } catch (err) {
        console.log("err :>> ", err);
        onError(err)
      }
    }, 800);
    return () => clearTimeout(searchLocation);
  }, [locationName]);

  const handleLocationNameChange = (event) => {
    setLocationName(event.target.value);
  };

  const handleWeatherDisplay = () => {
    onSearch(locationName);
    setLocationName(initialLoc);
  };

  const handleDropdownSelect = (val) => {
    setLocationName(val);
    setTimeout(() => {
      handleWeatherDisplay();

      setSearchResults([]);
    }, 100);
  };
  return (
    <div>
      <label
        htmlFor="visitors"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Location
      </label>
      <section className="flex flex-row gap-2">
        <input
          type="text"
          id="visitors"
          placeholder="Search..."
          value={locationName}
          minLength="3"
          min="3"
          onChange={handleLocationNameChange}
          className="flex-4 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body rounded-[1em]"
          required
        />
        <button
          onClick={handleWeatherDisplay}
          type="button"
          className="flex-1 text-body bg-neutral-secondary-medium box-border border border-default-medium px-1 text-sm focus:outline-none hover:underline"
        >
          Go
        </button>
      </section>
      {searchResults.length ? (
        <section className="z-10 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">
          <ul
            className="p-2 text-sm text-body font-small"
            aria-labelledby="dropdownDelayButton"
          >
            {searchResults.map((res, index) => {
              return (
                <li
                  key={index}
                  className="hover:bg-neutral-tertiary-medium hover:text-heading"
                >
                  <a
                    onClick={() => handleDropdownSelect(res.formatted)}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:underline rounded"
                  >
                    {res.formatted}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
