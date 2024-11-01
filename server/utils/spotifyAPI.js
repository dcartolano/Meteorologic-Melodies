const request = require('request');

const getPlaylists = async (condition, token) => {
    try {
        // console.log(import.meta.env);
        console.log('condition:', condition);
        console.log('token:', token);
        const response = await fetch(`https://api.spotify.com/v1/search?q=${condition}&type=playlist&limit=5`,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );
        // console.log('Response:', response);
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid API response, check the network tab');
        }
        // console.log('Data:', data);
        return data;
    } catch (err) {
        console.log('an error occurred', err);
        return [];
    }
};

// probably will need to delete all of this commented out code, as it is not functioning properly
// supposedly, we need to keep the route in the server.js file, and make a request to that end point within the other request and take the token from there
// app.get('/refresh_token', function(req, res) {

//     var refresh_token = "req.query.refresh_token";
//     var authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
//       },
//       form: {
//         grant_type: 'client_credentials',
//         refresh_token: refresh_token
//       },
//       json: true
//     };
  
//     // console.log(authOptions);
//     request.post(authOptions, function(error, response, body) {
//       console.log('error: ', error);
//       if (!error && response.statusCode === 200) {
//         var access_token = body.access_token,
//             refresh_token = body.refresh_token || refresh_token;
//         res.send({
//           'access_token': access_token,
//           'refresh_token': refresh_token
//         });
//       }
//     });
//   // res.json({});
//   });

// const spotifyToken = async () => {

//     let refresh_token = "req.query.refresh_token";
//     let authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
//         },
//         form: {
//             grant_type: 'client_credentials',
//             refresh_token: refresh_token
//         },
//         json: true
//     };

// // console.log(authOptions);
// request.post(authOptions, function(error, response, body) {
//     console.log('error: ', error);
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token,
//           refresh_token = body.refresh_token || refresh_token;
//       return ({
//         'access_token': access_token,
//         'refresh_token': refresh_token
//       });
//     }
//   });

//     const token =  request.post(authOptions, function (error, response, body) {
//         console.log('error: ', error);
//         //   console.log('response: ',response);
//         //   console.log('body: ', body);
//         // return body.access_token;
//         // console.log(response.body.access_token);
//             return body.access_token;
//             // if (!error && response.statusCode === 200) {
//             //   var access_token = body.access_token,
//             //       refresh_token = body.refresh_token || refresh_token;
//             // //   return ({
//             // //     'access_token': access_token,
//             // //     'refresh_token': refresh_token
//             // //   });
            
//             // }
//           });
//           return token;
//         };
    
//   export { getPlaylists };
// module.exports = { getPlaylists, spotifyToken };
module.exports = { getPlaylists };
