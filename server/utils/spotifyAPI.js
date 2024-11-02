const request = require('request');

const getPlaylists = async (condition, token) => {
    try {
        // console.log('condition:', condition);
        // console.log('token:', token);
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

module.exports = { getPlaylists };
