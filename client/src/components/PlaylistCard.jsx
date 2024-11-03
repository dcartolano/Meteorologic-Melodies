// import { Link } from 'react-router-dom';

function PlaylistCard({PlaylistName, PlaylistUrl, PlaylistPicture, PlaylistOwnerName, PlaylistOwnerLink}) {
    // console.log('playlist name: ', PlaylistName);
    return (
        // <a href={PlaylistUrl} target="_blank">
            <div className="">
                {/* <a> */}
                    <img src={PlaylistPicture} alt="Playlist Image"></img>
                {/* </a> */}
                <div>
                    <a className="" href={PlaylistUrl} target="_blank">
                        {`Spotify Playlist: ${PlaylistUrl}`}
                    </a>
                </div>
                <div>
                    <a className="" href={PlaylistUrl} target="_blank">
                        {`Click here for ${PlaylistName}`}
                    </a>
                </div>
                <div>
                    <h3 className="">
                        {`Playlist Owner Name: ${PlaylistOwnerName}`}
                    </h3>
                </div>
                <div>
                    <a className=""href={PlaylistOwnerLink} target="_blank" >
                        {`Playlist Owner: ${PlaylistOwnerLink}`}
                    </a>
                </div>
            </div>
        // </a>
    );
}

export default PlaylistCard;

// href={PlaylistUrl} target="_blank"







// <a><img src={Playlists/playlists.items[0].images[0].url} alt="Playlist Image"></img></a>