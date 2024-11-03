import { useState } from 'react';

import CurrentConditions from '../components/CurrentConditions';
import PlaylistCard from '../components/PlaylistCard';
import RecentSearches from '../components/RecentSearches';


const HomePage = () => {

    const [searchInput, setSearchInput] = useState('');
    // const [latLonData, setLatLonData] = useState({}); may need to change intial value, tried to set it as an empty object
    let [conditionsResponse, setConditionsResponse] = useState('');
    let [playlistsResponse, setPlaylistsResponse] = useState([]);
    // let conditionsResponse;
    // let playlistsResponse;

    // const [latLonData, setLatLonData] = useState({});

    const getConditionsAndPlaylists = async (event, zipcode) => {
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

            const responseData = await response.json();
            // conditionsResponse = responseData.conditionsData;
            setConditionsResponse(responseData.conditionsData);

            // playlistsResponse = responseData.playlistsData;
            // setPlaylistsResponse(responseData.playlistsData);
            setPlaylistsResponse(responseData.playlistsData.playlists.items);

            console.log('conditionsResponse: ', conditionsResponse);
            console.log('playlistsResponse: ', playlistsResponse);

            

            //console.log('playlist name:', playlistsResponse.playlists.items[0].name);
            // console.log('playlist: ', playlistsResponse.playlists); // Check the structure here
            // console.log('playlist item: ', playlistsResponse.playlists.items); // Check if items is defined
            // console.log('playlist item[0]: ', playlistsResponse.playlists.items[0].images.url);

            // TO-DO: update this state variable, and make another state variable, and also rename this one
            // setLatLonData(weatherData);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <>
            <div className=''>
                <section id='searchSection'>
                    <form
                        onSubmit={(event) =>
                            getConditionsAndPlaylists(event, searchInput)
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
                    Conditions={conditionsResponse}
                    />
                </div>
                <div>
                    <h2 className="">
                        {`Playlists to match your mood:`}
                    </h2>
                </div>
                <div>
                    {playlistsResponse ? playlistsResponse.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            PlaylistName={playlist.name}
                            PlaylistUrl={playlist.external_urls.spotify}
                            PlaylistPicture={playlist.images[0].url}
                            // Playlists={playlistsResponse}
                        />
                    )
                    ) : (
                        <div>
                        Playlists go here...
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    );
};

export default HomePage;

