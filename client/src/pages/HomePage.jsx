import { useState } from 'react';

import CurrentConditions from '../components/CurrentConditions';
import PlaylistCard from '../components/PlaylistCard';
import RecentSearches from '../components/RecentSearches';


const HomePage = () => {

    const [searchInput, setSearchInput] = useState('');
    const [latLonData, setLatLonData] = useState({}); // may need to change intial value, tried to set it as an empty object

    const searchForLatLonbyZipcode = async (event, zipcode) => {
        event.preventDefault();
        console.log('zipcode: ', zipcode);
        try {
            const response = await fetch(`http://localhost:3001/api/weather?zip=${zipcode}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const weatherData = await response.json();
            console.log(weatherData); // Handle the weather data as needed
            setLatLonData(weatherData);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };

    return (
        <>
            <section id='searchSection'>
                <form
                    onSubmit={(event) =>
                        searchForLatLonbyZipcode(event, searchInput)
                    }
                >
                    <input
                        type='text'
                        name='zipcode'
                        id='zipcode'
                        placeholder='Enter your Zipcode'
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button id='searchBtn'>
                        Search
                    </button>
                </form>
            </section>
            <div>
                <RecentSearches 
                // RecentSearches = {recentSearches}
                />
            </div>
            <div>
                <CurrentConditions 
                // Conditions={conditions}
                />
            </div>
            <div>
                <PlaylistCard 
                        // Playlists={playlists}
                />
            </div>
        </>
    );
};

export default HomePage;

