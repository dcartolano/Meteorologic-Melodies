function PlaylistCard({PlaylistName, PlaylistUrl, PlaylistPicture, PlaylistOwnerName, PlaylistOwnerLink, inputDataText}) {
    // console.log('playlist name: ', PlaylistName);
    
    return (
        // playlist card containing a picture and two interactable a tags that open the playlist in a new tab
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
    );
}

export default PlaylistCard;
