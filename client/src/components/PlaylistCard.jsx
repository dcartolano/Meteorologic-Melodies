// import { Link } from 'react-router-dom';

function PlaylistCard({PlaylistName, PlaylistUrl, PlaylistPicture}) {
    // console.log('playlist name: ', PlaylistName);
    return (
        <a href={PlaylistUrl} target="_blank">
            <div className="">
                {/* <a> */}
                    <img src={PlaylistPicture} alt="Playlist Image"></img>
                {/* </a> */}
                <div>
                    <h3 className="">
                        {`Spotify Playlist: `}
                    </h3>
                </div>
                <div>
                    {/* <a className="" > */}
                        {`Click here for ${PlaylistName}`}
                    {/* </a> */}
                </div>
                {/* <div>
                    <h3 className="">
                        {`${Playlists.playlists.items[0].owner.display_name}`}
                    </h3>
                </div>
                <div>
                    <h3 className="">
                        {`${Playlists.playlists.items[0].owner.external_urls.spotify}`}
                    </h3>
                </div> */}
            </div>
        </a>
    );
}

export default PlaylistCard;

// href={PlaylistUrl} target="_blank"







// <a><img src={Playlists/playlists.items[0].images[0].url} alt="Playlist Image"></img></a>