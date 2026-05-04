import { useState } from "react"
import { useSeries } from "../hooks/useSeries"
import type { SeriesFilters } from "../types/tmdb"
import Hero from "../Components/Hero/Hero"
import { tvGenres } from "../lib/genres"
import CardSection from "../Components/Cards/CardSection"

const Series = () => {
    const [filters, setFilters] = useState<SeriesFilters>({})
    const { data, isError, isLoading, hasNextPage, fetchNextPage } = useSeries(filters)

    if (isLoading) return <p>Is Loading</p>
    if (isError) return <p>Is Error</p>
    if (!data) return <p>No Data</p>

    const series = data.pages.flatMap((page) => page.results)

    return (
        <div className="w-full h-auto flex flex-col gap-y-4">
            <Hero show={{ ...series[0], title: series[0].name, media_type: 'tv', poster_path: series[0].poster_path, genres: series[0].genre_ids }} />
            <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-y-6 -mt-10 z-10">
                <h3 className="font-semibold uppercase text-stone-500 text-4xl text-center">Series</h3>
                <div className="flex flex-wrap items-center gap-2">
                    <select onChange={(e) => setFilters((prev) => ({ ...prev, with_genres: e.target.value ? Number(e.target.value) : undefined }))}
                        value={filters['with_genres']} className="bg-stone-100 text-stone-800 font-semibold text-sm p-1 rounded-lg">
                        {Object.entries(tvGenres).map(([id, name]) => (
                            <option value={id} key={id}>{name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFilters((pre) => ({ ...pre, sort_by: (e.target.value as SeriesFilters['sort_by']) || undefined }))}
                        value={filters['sort_by']} className="bg-stone-100 text-stone-800 font-semibold text-sm p-1 rounded-lg">
                        <option value="">Default</option>
                        <option value="popularity.desc">Popularity</option>
                        <option value="vote_average.desc">Rating</option>
                        <option value="first_air_date.desc">Air Date</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {series.map((s) => (
                        <CardSection key={`${s.id}-filter`} show={{ ...s, title: s.name, media_type: "tv", year: s.first_air_date }} />
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

export default Series