const searchSpotify = async (query) => {
    try {
        
        // console.log(import.meta.env);
        const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=5`,
        {
            headers: {
            Authorization: `Bearer ${import.meta.env.SPOTIFY_API_TOKEN}`,
            },
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
        // console.log('an error occurred', err);
        return [];
    }
  };
  
  export { searchSpotify };
  