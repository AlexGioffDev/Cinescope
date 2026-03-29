import { useState } from "react"
import { useSeries } from "../hooks/useSeries"
import type { SeriesFilters } from "../types/tmdb"

const Series = () => {
    const [filters, setFilters] = useState<SeriesFilters>({})
    const { data, isError, isLoading, hasNextPage, fetchNextPage } = useSeries(filters)

    if (isLoading) return <p>Is Loading</p>
    if (isError) return <p>Is Error</p>
    if (!data) return <p>No Data</p>

    const series = data.pages.flatMap((page) => page.results)

    return (
        <div className="p-4 flex flex-col gap-3 h-full items-center">
            {series.length}

        </div>
    )
}

export default Series