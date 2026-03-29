import { useWatchListStore } from "../store/useWatchlistStore"

const Watchlist = () => {
    const { watchlist } = useWatchListStore();

    return (
        <div className="py-4 h-full flex flex-col gap-3 items-center">
            <p className="shrink-0 text-stone-100 uppercase font-black text-4xl">Watchlist</p>
        </div>
    )
}

export default Watchlist