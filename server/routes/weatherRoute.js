const express = require('express');
const weatherAPI = require('./weatherAPI'); // Import your weatherAPI.js

const app = express();
const PORT = process.env.PORT || 3000;

// Define a route for fetching weather data
app.get('/api/weather', async (req, res) => {
    try {
        const weatherData = await weatherAPI.fetchWeatherData(); // Assuming you have a function to fetch data
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});