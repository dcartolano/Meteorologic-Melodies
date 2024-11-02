function PlaylistCard({PlaylistName, PlaylistUrl}) {
    // console.log('playlist name: ', PlaylistName);
    return (
        <div className="">
            <div>
                <h3 className="">
                    {`Spotify Playlist: `}
                </h3>
            </div>
            <div>
                <a className="" href={PlaylistUrl} target="_blank">
                    {`Click here for ${PlaylistName}`}
                </a>
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
        
    );
}

export default PlaylistCard;









// <a><img src={Playlists/playlists.items[0].images[0].url} alt="Playlist Image"></img></a>