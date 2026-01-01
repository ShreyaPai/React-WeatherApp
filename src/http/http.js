export async function getLatLngByLocName(locName) {
    const endpoint = `https://api.geoapify.com/v1/geocode/search?text=${locName}&apiKey=1f588394174e47ad93c6a56d1e0c6d68`
    const response = await fetch(endpoint);

    const data = response.json();
    if (!response.ok) {
        throw new Error("Error in loading data.");
    }

    return data;
}

export async function getWeatherData(lat, long) {
    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
    const response = await fetch(endpoint);

    const data = response.json();

    if (!response.ok) {
        throw new Error('Unable to fetch data...')
    }

    return data;
}

export async function getLocations(searchValue) {
    const endpoint = `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchValue}&format=json&apiKey=1f588394174e47ad93c6a56d1e0c6d68`;
    const response = await fetch(endpoint);

    const data = response.json();

    if (!response.ok) {
        throw new Error("Unable to fecth data")
    }

    return data;
}