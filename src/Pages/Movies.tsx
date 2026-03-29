import { useState } from "react"
import { useMovies } from "../hooks/useMovies"
import { movieGenres } from "../lib/genres"
import type { MovieFilter } from "../types/tmdb"

const Movies = () => {
    const [filters, setFilters] = useState<MovieFilter>({})
    const { hasNextPage, isError, isLoading, fetchNextPage, data } = useMovies(filters)

    if (isError) return <p>Error</p>
    if (isLoading) return <p>Is Loading...</p>
    if (!data) return <p>No Data</p>

    const movies = data.pages.flatMap((page) => page.results)

    return (
        <div className="p-4 flex flex-col gap-3 h-full items-center">
            {movies.length}

        </div>
    )
}

export default Movies