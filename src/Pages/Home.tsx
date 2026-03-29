import { useTrendingAll } from '../hooks/useGetHome'
import { useMemo, useRef, useState } from 'react'

const Home = () => {
    const { trendingMovies,
        trendingSeries,
        popularMovies,
        popularSeries,
        topRatedMovies,
        topRatedSeries,
        upcomingMovies,
        isLoading,
        isError } = useTrendingAll()

    const all = useMemo(() => {
        if (!trendingMovies?.results || !trendingSeries?.results) return []
        return [...trendingMovies.results, ...trendingSeries.results]
    }, [trendingMovies, trendingSeries])

    const [heroIndex, setHeroIndex] = useState(0)
    const initialized = useRef(false)

    if (all.length > 0 && !initialized.current) {
        initialized.current = true
        // eslint-disable-next-line react-hooks/purity
        setHeroIndex(Math.floor(Math.random() * all.length))
    }

    const hero = all[heroIndex]

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading data</p>

    return (
        <div className='space-y-10'>
            <p>Homepage</p>
        </div>
    )
}

export default Home