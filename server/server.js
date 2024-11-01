//import pg from 'pg'; // do we still need this?
require("dotenv").config();

const weatherAPI = require('./utils/weatherAPI');
const spotifyAPI = require('./utils/spotifyAPI');

const cors = require('cors');
const request = require('request');
const express = require('express');
// Import and require Pool (node-postgres)
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

// TO-DO: consider renaming this end-point (route)
app.get('/api/weather', async (req, res) => {
  try {
    // get the lat and lon
    const latLonData = await weatherAPI.getLatLon(req.query.zip); // get the object that contains the lat and lon data
    // console.log(latLonData);
    // pass in the lat and lon in the request to get the weather conditions
    const conditionsData = await weatherAPI.getWeatherConditions(latLonData.lat, latLonData.lon);
    // console.log(conditionsData);
    // console.log('conditionsData description: ', conditionsData.list[0].weather[0].description); // conditions keywords
    // TO-DO: NEED TO GET RID OF THE FOLLOWING LINES RELATED TO TOKEN AND MAKE THEM ACTUALLY WORK AND RETURN A TOKEN FOR GETPLAYLISTS FUNCTION TO USE
    // const token = await spotifyAPI.spotifyToken();
    // token.then((i) => { return i });
    // console.log('token: ', token);
    // then, returning the playlists from spotify
    const spotifyData = await spotifyAPI.getPlaylists(conditionsData.list[0].weather[0].description, token); // currently token does not work and needs to be hard-coded
    // console.log(spotifyData);
    // then, update the database with the weather conditions and the playlist (maybe?? let's talk about this)
    // TO-DO
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

app.get('/refresh_token', function (req, res) {

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
