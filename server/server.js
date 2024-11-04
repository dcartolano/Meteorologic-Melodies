//import pg from 'pg'; // do we still need this?
require("dotenv").config();

const weatherAPI = require('./utils/weatherAPI');
const spotifyAPI = require('./utils/spotifyAPI');
const path = require('path');

const cors = require('cors');
const request = require('request');
const express = require('express');
// Import and require Pool (node-postgres)
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database

let pool = null;
if (process.env.DB_URL) {
  pool = new Pool({
    connectionString: process.env.DB_URL
  })
} else {
  pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: 'localhost',
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
  )
}


pool.connect();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use(express.static('../client/dist'));
// TO-DO: consider renaming this end-point (route)
// maybe externalData? or just external?
// end-point to retrieve weather conditions and playlist data from both the Open Weather and Spotify external API's when passed 
app.get('/api/external', async (req, res) => {
  try {
    // // passes in the zipcode entered by the user to get back the objec that contians the assosciated lat and lon values
    const latLonData = await weatherAPI.getLatLon(req.query.zip);
    // log to test that object containing the lat and lon values comes back correctly
    // console.log('latLonData: ', latLonData); 
    // // passes in the lat and lon in the request to get the big weather object that contains the conditions
    const bigWeatherData = await weatherAPI.getWeatherConditions(latLonData.lat, latLonData.lon);
    // // log to test that the big object containing the weather conditions values comes back correctly
    // console.log('bigWeatherData: ', bigWeatherData);
    const conditionsData = bigWeatherData.list[0].weather[0].description;

    const conditionsIcon = bigWeatherData.list[0].weather[0].icon;
    const conditionsIconUrl = `http://openweathermap.org/img/w/${conditionsIcon}.png`;

    // // log to test that we are grabbing the conditions from the big weather object correctly
    // console.log('conditionsData: ', conditionsData);

    // writes new zipcode to database
    const sql = `INSERT INTO locations (zipcode)
    VALUES ($1)`;
    const params = [req.query.zip];

    pool.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
    });

    // // defines token so that it can be used later
    let token = '';

    // // uses the refresh_token endpoint to get Spotify access token that we need to pass to getPlaylists
    try {
      const response = await fetch(`/api/refresh_token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const spotifyToken = await response.json();
      // // log to check that token is coming back ok from the route and we are accessing the correct parameter
      // console.log('token (inside fetch): ', spotifyToken.access_token); 
      token = spotifyToken.access_token;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    // // log to check that our token is coming back ok and is usable in the main part of the route
    // console.log('token (after fetch): ', token);

    // // passes our conditions and spotify token to the getPlaylists function in the spotifyAPI util 
    const playlistsData = await spotifyAPI.getPlaylists(conditionsData, token);
    // // log to check that the object that contains all the playlists is coming back correctly
    // console.log('playlistData: ' playlistsData);

    res.send({
      'conditionsData': conditionsData,
      'conditionsIconUrl': conditionsIconUrl,
      'playlistsData': playlistsData
    });
    // TO-DO: see below
    // then, update the database with the weather conditions and the playlist (maybe?? let's talk about this)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// grabs the full table
// may not need this one at all
const searchForLatLonbyZipcode = async (event, zipcode) => {
  // console.log('zipcode: ', zipcode);
  try {
    const response = await fetch(`/api/weather?zip=${zipcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const weatherData = await response.json();
    // console.log(weatherData); 
    setLatLonData(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// adds a new zip code to the locations table
app.post('/api/new-location', ({ body }, res) => {
  const sql = `INSERT INTO locations (zipcode)
    VALUES ($1)`;
  const params = [body.zipcode];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Get Request
app.get('/api/locations', (req, res) => {
  const sql = `SELECT * FROM locations`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // res.json({
    //   message: 'success',
    //   data: rows
    // });
    res.send({
      data: rows
    });

  });
});

// uses Spotify Client ID and Secret to request a token that is good for an hour for spotifyAPI.js getPlaylists function to use
app.get('/api/refresh_token', function (req, res) {

  var refresh_token = "req.query.refresh_token";
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials',
      refresh_token: refresh_token
    },
    json: true
  };
  request.post(authOptions, function (error, response, body) {
    console.log('error: ', error);
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token || refresh_token;
      res.send({
        'access_token': access_token,
        'refresh_token': refresh_token
      });
    }
  });
});

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
