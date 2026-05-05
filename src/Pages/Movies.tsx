import { useState } from "react"
import { useMovies } from "../hooks/useMovies"
import { movieGenres } from "../lib/genres"
import type { MovieFilter } from "../types/tmdb"
import CardSection from "../Components/Cards/CardSection"
import Hero from "../Components/Hero/Hero"
import Error from "../Components/Error/Error"
import Loading from "../Components/Loading/Loading"
import Empty from "../Components/Empty/Empty"

const Movies = () => {
    const [filters, setFilters] = useState<MovieFilter>({})
    const { hasNextPage, isError, isLoading, fetchNextPage, data } = useMovies(filters)

    if (isError) return <Error />
    if (isLoading) return <Loading />
    if (!data) return <Empty />

    const movies = data.pages.flatMap((page) => page.results)

    return (
        <div className="w-full h-auto flex flex-col gap-y-4">
            <Hero show={{ ...movies[0], title: movies[0].title, media_type: 'movie', poster_path: movies[0].poster_path, genres: movies[0].genre_ids }} />
            <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-y-6 -mt-10 z-10">
                <h3 className="font-semibold uppercase text-stone-500 text-4xl text-center">Movies</h3>
                <div className="flex flex-wrap items-center gap-2">
                    <select onChange={(e) => setFilters((prev) => ({ ...prev, with_genres: e.target.value ? Number(e.target.value) : undefined }))}
                        value={filters['with_genres']} className="bg-stone-100 text-stone-800 font-semibold text-sm p-1 rounded-lg">
                        {Object.entries(movieGenres).map(([id, name]) => (
                            <option value={id} key={id}>{name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFilters((pre) => ({ ...pre, sort_by: (e.target.value as MovieFilter['sort_by']) || undefined }))}
                        value={filters['sort_by']} className="bg-stone-100 text-stone-800 font-semibold text-sm p-1 rounded-lg">
                        <option value="">Default</option>
                        <option value="popularity.desc">Popularity</option>
                        <option value="vote_average.desc">Rating</option>
                        <option value="primary_release_date.desc">Release Date</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {movies.map((movie) => (
                        <CardSection key={`${movie.id}-filter`} show={{ ...movie, title: movie.title, media_type: "movie", year: movie.release_date }} />
                    ))}
                </div>
                {hasNextPage && (
                    <button className="self-center bg-stone-800 text-stone-300 border border-stone-50 rounded-lg px-4 py-2" onClick={() => fetchNextPage()}>
                        Load More
                    </button>
                )}
            </div>
        </div>
    )
}

export default Movies