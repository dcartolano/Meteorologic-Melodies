const getPlaylists = async (condition, token) => {
    try {
        
        // console.log(import.meta.env);
        console.log('condition:',condition);
        const response = await fetch(`http://api.spotify.com/v1/search?q=${condition}&type=playlist&limit=5/`,
        // `http://api.spotify.com/v1/search?q=cloudy&type=playlist&limit=5`,
        {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
            // 'Authorization': `Bearer ${token}`,
            'Authorization': `Bearer BQB8Fe_H6rc7jiqg0aDcvuJ5aMQ3eqcVRsn2Xx8smL-eTOaa83lcqDuXf5uUwYKPJAESezfGDSzI-FQ6pyKTbait_hsdiLJYWAM79O7cBWd-ogNDxK8`,
            'Content-Type': 'application/json',
            },
        }
        );
        console.log('Response:', response);
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
  
//   export { getPlaylists };
  module.exports= {getPlaylists};
  