import CardSection from "../Components/Cards/CardSection";
import { useWatchListStore } from "../store/useWatchlistStore"

const Watchlist = () => {
    const { watchlist } = useWatchListStore();

    return (
        <div className="w-full min-h-screen pt-20">
            <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-y-6">
                <h3 className="font-semibold uppercase text-stone-500 text-2xl text-center">Watchlist</h3>
                {watchlist.length <= 0 ? (
                    <p className="text-stone-500 text-center">Nothing here yet.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {watchlist.map((show) => (
                            <CardSection key={`watchlist-${show.id}`} show={{
                                id: show.id,
                                title: show.media_type === 'movie' ? show.title : show.name,
                                poster_path: show.poster_path,
                                overview: show.overview,
                                vote_average: show.vote_average,
                                media_type: show.media_type,
                                year: show.media_type === 'movie' ? show.release_date : show.first_air_date,
                            }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Watchlist