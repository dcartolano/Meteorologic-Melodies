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
        console.log('zipcode: ', zipcode);
        try {
            const response = await fetch(`http://localhost:3001/api/external?zip=${zipcode}`, {
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

            console.log('conditionsResponse: ', conditionsResponse);
            console.log('conditionsIconUrl: ', conditionsIconUrl);
            console.log('playlistsResponse: ', playlistsResponse);

            // console.log('playlist: ', playlistsResponse); // check the structure here
            //console.log('playlist 1 name:', playlistsResponse[0].name); // check the name of the first playlis
            // console.log('playlist 1 image: ', playlistsResponse[0].images[0].url); check the image for the firt playlist

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const getRecentLocations = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/locations`, {
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

            // // these work
            console.log(locationsResponse);
            console.log(locationsResponse.data);
            // console.log(locationsResponse.data[0].zipcode);

            // // these do not work
            // console.log(recentLocations);
            // console.log(recentLocations[0].zipcode);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        // code that we want to run
        // console.log('search input is: ', searchInput);
        // searchInput === '' ? () => { } :
        getRecentLocations();

        // optional return function
        // return () => {
        //     console.log('I clean up');
        // };
    },[]) // dependency array

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
                            // some function like clearSearchHistory that would call a delete route that would need to be created and clear out database
                        }
                        }
                    >
                        <button id='searchBtn'>
                            Reset
                        </button>
                    </form>
                </section>
                <div>
                    {recentLocations.length > 0 ? recentLocations.map((location) => (
                        // <RecentSearches
                        //     key={location.id}
                        //     RecentLocation={location.zipcode}
                        // />
                        console.log(location.zipcode)
                    )
                    ) : (
                        <div>
                            Recent searches go here...
                        </div>
                    )
                    }
                </div>
                <div>
                    {conditionsResponse ? (
                        <CurrentConditions
                            Conditions={conditionsResponse}
                            ConditionsUrl={conditionsIconUrl}
                        />
                    ) : (
                        <div>
                            Current Conditions go here...
                        </div>
                    )
                    }
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