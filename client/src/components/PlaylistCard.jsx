// import { Link } from 'react-router-dom';

function PlaylistCard({PlaylistName, PlaylistUrl, PlaylistPicture, PlaylistOwnerName, PlaylistOwnerLink, inputDataText}) {
    // inputDataText = "Your Playlist Results:";
    // console.log('playlist name: ', PlaylistName);
    
    return (
        // playlist card containing a picture and two interactable a tags that open the playlist in a new tab
        // <a href={PlaylistUrl} target="_blank">
            <div className="spotifyPlaylistCard">
                <div id="spotifyPlaylistCardMiniCard">
                    <a className="" href={PlaylistUrl} target="_blank">
                        <img className="spotifyPlaylistPicture" src={PlaylistPicture} alt="Playlist Image"></img>
                    </a>
                    <div className="playlistTextDiv">
                        <a className="playlistText" href={PlaylistUrl} target="_blank">
                            {`Spotify Playlist: ${PlaylistName}`}
                        </a>
                    </div>
                    <div className="playlistTextDiv">
                        <a className="playlistText" href={PlaylistOwnerLink} target="_blank" >
                            {`Owner: ${PlaylistOwnerName}`}
                        </a>
                    </div>
                </div>
            </div>
        // </a>
    );
}

export default PlaylistCard;








// Use this to make the link open in a separate tab
// href={PlaylistUrl} target="_blank"

// url for playlist image
{/* <a>
    <img src={Playlists/playlists.items[0].images[0].url} alt="Playlist Image"></img>
</a> */}

// instruction div
{/* <div>
    <a className="playlistText" href={PlaylistUrl} target="_blank">
        <h3>
            {`Click Here For A Playlist That Matches Your Mood`}
        </h3>
    </a>
</div> */}