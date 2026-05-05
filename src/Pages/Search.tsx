import { useSearchParams } from "react-router-dom"
import { useSearch } from "../hooks/useSearch";
import CardSection from "../Components/Cards/CardSection";
import Loading from "../Components/Loading/Loading";
import Error from "../Components/Error/Error";
import Empty from "../Components/Empty/Empty";

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const { data, isLoading, isError } = useSearch(query);

    if (isLoading) return <Loading />
    if (isError) return <Error />
    if (!data) return <Empty />

    return (
        <div className="w-full min-h-screen pt-20">
            <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-y-6">
                <h3 className="font-semibold uppercase text-stone-500 text-2xl">
                    Results for <span className="text-stone-300">"{query}"</span>
                </h3>
                {data.length <= 0 ? (
                    <p className="text-stone-500">No results found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {data.map((show) => (
                            <CardSection key={`search-${show.id}`} show={{
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

export default Search