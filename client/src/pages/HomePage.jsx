import { useState, useEffect } from 'react';

import CurrentConditions from '../components/CurrentConditions';
import PlaylistCard from '../components/PlaylistCard';
import RecentSearches from '../components/RecentSearches';

const HomePage = () => {

    const [searchInput, setSearchInput] = useState('');
    const [conditionsResponse, setConditionsResponse] = useState('');
    const [conditionsIconUrl, setConditionsIconUrl] = useState('');
    const [playlistsResponse, setPlaylistsResponse] = useState([]);
    const [recentLocations, setRecentLocations] = useState([]);

    const getConditionsAndPlaylists = async (event, zipcode) => {
        event.preventDefault();
        // console.log('zipcode: ', zipcode);
        try {
            const response = await fetch(`/api/external?zip=${zipcode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setConditionsResponse(responseData.conditionsData);
            setConditionsIconUrl(responseData.conditionsIconUrl);
            setPlaylistsResponse(responseData.playlistsData.playlists.items);

            // check that our setState variables were assigned correctly
            // console.log('conditionsResponse: ', conditionsResponse);
            // console.log('conditionsIconUrl: ', conditionsIconUrl);
            // console.log('playlistsResponse: ', playlistsResponse);

            // console.log('playlist: ', playlistsResponse); // checks the structure here
            //console.log('playlist 1 name:', playlistsResponse[0].name); // checks the name of the first playlist
            // console.log('playlist 1 image: ', playlistsResponse[0].images[0].url); // checks the image for the first playlist

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getRecentLocations = async () => {
        try {
            const response = await fetch(`/api/locations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const locationsResponse = await response.json();

            setRecentLocations(locationsResponse.data);

            // check the structure of information coming back
            // console.log('locationsResponse: ', locationsResponse);
            // console.log('locationsResponse.data: ',locationsResponse.data);
            // console.log('locationsResponse.data[0].zipcode: ',locationsResponse.data[0].zipcode);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        getRecentLocations();
    }, [])

    return (
        <>
            <div className=''>
                <section id='searchSection'>
                    <form
                        onSubmit={(event) => {
                            getConditionsAndPlaylists(event, searchInput);
                        }
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
                <section id='searchSection'>
                    <form
                        onSubmit={(event) => {
                            setSearchInput('');
                            setConditionsResponse('');
                            setConditionsIconUrl('');
                            setPlaylistsResponse([]);
                        }
                        }
                    >
                        <button id='searchBtn' className='resetButton'>
                            Reset
                        </button>
                    </form>
                </section>
                <div>
                    {recentLocations.length > 0 ? recentLocations.map((location) => {
                        // console.log(location)
                        <RecentSearches
                            key={location.id}
                            RecentLocation={location.zipcode}
                        />
                        // console.log('location: ', location);
                        // console.log('location.id: ', location.id);
                        // console.log('location.zipcode: ', location.zipcode);
                    }
                    ) : (
                        <div>
                            Recent searches go here...
                        </div>
                    )
                    }
                </div>
                <div className='weatherConditionsInfoText'>
                    {conditionsResponse ? (
                        <CurrentConditions
                            Conditions={conditionsResponse}
                            ConditionsUrl={conditionsIconUrl}
                        />
                    ) : (
                        <div>
                            <h4>
                                Your current weather Conditions are...
                            </h4>
                        </div>
                    )
                    }
                </div>
                <div>
                    <h2 className="">
                        {'Playlist Results For Your Mood:'}
                    </h2>
                    <div className='playlistResultsBlackBar'></div>
                </div>
                <div className=''>
                    {playlistsResponse ? playlistsResponse.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            PlaylistName={playlist.name}
                            PlaylistUrl={playlist.external_urls.spotify}
                            PlaylistPicture={playlist.images[0].url}
                            PlaylistOwnerName={playlist.owner.display_name}
                            PlaylistOwnerLink={playlist.owner.external_urls.spotify}
                        />
                    )
                    ) : (
                        <div>
                            Your playlists will appear here...
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    );
}

export default HomePage;