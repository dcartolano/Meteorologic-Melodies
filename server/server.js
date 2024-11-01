//import pg from 'pg';
require("dotenv").config(); 
const weatherAPI = require('./utils/weatherAPI');
const spotifyAPI = require('./utils/spotifyAPI');
const cors = require('cors');

const request = require('request');

const express = require('express');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
const pool = new Pool(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
)

pool.connect();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/api/weather', async (req, res) => {
  try {
    // console.log(req);
          // get the lat and lon
      const weatherData = await weatherAPI.getLatLon(req.query.zip); // Assuming you have a function to fetch data
      console.log(weatherData);
      // console.log(weatherData);
      // pass in the lat and lon in the request to get the weather conditions
      const weatherData2 = await weatherAPI.getWeatherConditions(weatherData.lat, weatherData.lon);
      
      console.log(weatherData2);
      // making another req to spotify using the weather conditions from query
      const spotifyData = await spotifyAPI.getPlaylists('clouds', 'BQB8Fe_H6rc7jiqg0aDcvuJ5aMQ3eqcVRsn2Xx8smL-eTOaa83lcqDuXf5uUwYKPJAESezfGDSzI-FQ6pyKTbait_hsdiLJYWAM79O7cBWd-ogNDxK8');

      console.log(spotifyData);
      // then, returning the playlists from spotify
      // then, updating the database with the weather conditions and the playlist
      res.json(weatherData);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Post Request
app.post('/api/new-location', ({ body }, res) => {
  const sql = `INSERT INTO locations (zipcode)
    VALUES ($1)`;
  const params = [body.zipcode]; // is this correct???

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
  const sql = `SELECT zipcode FROM locations`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

app.get('/refresh_token', function(req, res) {

  var refresh_token = "req.query.refresh_token";
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials',
      refresh_token: refresh_token
    },
    json: true
  };

  // console.log(authOptions);
  request.post(authOptions, function(error, response, body) {
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
// res.json({});
});

// Delete Request
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = $1`;
//   const params = [req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.rowCount,
//         id: req.params.id
//       });
//     }
//   });
// });

// Get Request using Left Join
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// Update Request
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
//   const params = [req.body.review, req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Review not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.rowCount
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
