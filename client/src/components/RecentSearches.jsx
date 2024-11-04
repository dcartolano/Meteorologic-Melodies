function RecentSearches(RecentLocation) {
    // console.log('RecentLocation from inside RecentSearches: ', RecentLocation);
    
        return (
            <div className="">
                <section id='searchSection'>
                        <button id='searchBtn'>
                            {RecentLocation}
                        </button>
                </section>
            </div>
        );
}

export default RecentSearches;