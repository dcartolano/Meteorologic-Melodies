import { useState } from 'react';
import { getLatLon, getWeatherConditions } from '../../../server/api/weatherAPI';


const HomePage = () => {

    const [searchInput, setSearchInput] = useState('');
    const [latLonData, setLatLonData] = useState({}); // may need to change intial value, tried to set it as an empty object

    // IGONORE THESE FOR NOW
    //   const addToWatchList = () => {
    //     let parsedFilmsToWatch: Film[] = [];
    //     const storedFilmsToWatch = localStorage.getItem('filmsToWatch');
    //     if (typeof storedFilmsToWatch === 'string') {
    //       parsedFilmsToWatch = JSON.parse(storedFilmsToWatch);
    //     }
    //     parsedFilmsToWatch.push(currentFilm);
    //     localStorage.setItem('filmsToWatch', JSON.stringify(parsedFilmsToWatch));
    //   };

    //   const addToSeenItList = () => {
    //     let parsedAlreadySeenFilms: Film[] = [];
    //     const storedAlreadySeenFilms = localStorage.getItem('alreadySeenFilms');
    //     if (typeof storedAlreadySeenFilms === 'string') {
    //       parsedAlreadySeenFilms = JSON.parse(storedAlreadySeenFilms);
    //     }
    //     parsedAlreadySeenFilms.push(currentFilm);
    //     localStorage.setItem(
    //       'alreadySeenFilms',
    //       JSON.stringify(parsedAlreadySeenFilms)
    //     );
    //   };

    const searchForLatLonbyZipcode = async (event, zipcode) => {
        event.preventDefault();
        const latLonObject = await getLatLon(zipcode);
        console.log(latLonObject)

        setLatLonData(latLonObject);
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
                        name=''
                        id=''
                        placeholder='Enter your Zipcode'
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button id='searchBtn'>
                        Search
                    </button>
                </form>
            </section>
            {/* <FilmCard
        currentFilm={currentFilm}
        addToWatchList={addToWatchList}
        addToSeenItList={addToSeenItList}
      /> */}
        </>
    );
};

export default HomePage;

