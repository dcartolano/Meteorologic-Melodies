
const getLatLon = async (zipcode) => {
    console.log('Weather API Key = ', process.env.WEATHER_API_KEY);
    try {
        
        const latLonResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=
        ${process.env.WEATHER_API_KEY}`
        );
        console.log('latLonResponse:', latLonResponse);
        const latLonData = await latLonResponse.json();
        if (!latLonResponse.ok) {
            throw new Error('invalid API response, check the network tab');
        }
        console.log('latLonData:', latLonData);
        return latLonData;
    } catch (err) {
        console.log('an error occurred', err);
        return [];
    }
};

const getWeatherConditions = async (lat, lon) => {
    console.log('Weather API Key = ', process.env.WEATHER_API_KEY);
    try {
        const conditionsResponse = await fetch(
            `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=1&appid=
            ${process.env.WEATHER_API_KEY}`
        );
        //   console.log('conditionsResponse:', conditionsResponse);
        const conditionsData = await conditionsResponse.json();
        if (!conditionsResponse.ok) {
            throw new Error('invalid API response, check the network tab');
        }
        //   console.log('conditionsData:', conditionsData);
        return conditionsData;
    } catch (err) {
        console.log('an error occurred', err);
        return [];
    }
};

export { getLatLon, getWeatherConditions };
