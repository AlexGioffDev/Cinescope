import CardSection from '../Components/Cards/CardSection';
import Hero from '../Components/Hero/Hero';
import { useTrendingAll, } from '../hooks/useGetHome'

const Home = () => {
    const { isLoading, isError, heroItem, trendingMovies, trendingSeries, popularMovies, popularSeries, topRatedMovies, topRatedSeries, upcomingMovies } = useTrendingAll();

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading data</p>

    return (
        <div className='space-y-10'>
            <Hero show={heroItem} />
            <section className='px-4 space-y-4 '>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Trending Movies</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {trendingMovies?.results.map((movie) => (
                        <CardSection key={`movie-trending-${movie.id}${movie.title}`} show={{ ...movie, title: movie.title, year: movie.release_date, media_type: "movie" }} />
                    ))}
                </div>
            </section>
            <section className='px-4 space-y-4'>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Trending TV Series</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {trendingSeries?.results.map((tv) => (
                        <CardSection key={`tv-trending-${tv.id}${tv.name}`} show={{ ...tv, title: tv.name, year: tv.first_air_date, media_type: "tv" }} />
                    ))}
                </div>
            </section>
            <section className='px-4 space-y-4'>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Upcoming Movies</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {upcomingMovies?.results.map((movie) => (
                        <CardSection key={`upcoming-movie-${movie.id}${movie.title}`} show={{ ...movie, title: movie.title, year: movie.release_date, media_type: "movie" }} />
                    ))}
                </div>
            </section>
            <section className='px-4 space-y-4'>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Popular Movies</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {popularMovies?.results.map((movie) => (
                        <CardSection key={`popular-movie-${movie.id}${movie.title}`} show={{ ...movie, title: movie.title, year: movie.release_date, media_type: "movie" }} />
                    ))}
                </div>
            </section>
            <section className='px-4 space-y-4'>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Popular TV Series</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {popularSeries?.results.map((tv) => (
                        <CardSection key={`tv-popular-${tv.id}${tv.name}`} show={{ ...tv, title: tv.name, year: tv.first_air_date, media_type: "tv" }} />
                    ))}
                </div>
            </section>
            <section className='px-4 space-y-4'>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Top Rated Movies</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {topRatedMovies?.results.map((movie) => (
                        <CardSection key={`top-rated-movie-${movie.id}${movie.title}`} show={{ ...movie, title: movie.title, year: movie.release_date, media_type: "movie" }} />
                    ))}
                </div>
            </section>
            <section className='px-4 space-y-4'>
                <h2 className='text-stone-500 uppercase font-semibold text-xl'>Top Rated TV Series</h2>
                <div className='  pb-2 flex items-center gap-3 overflow-x-auto pr-4 scrollbar-thin'>
                    {topRatedSeries?.results.map((tv) => (
                        <CardSection key={`tv-top-rated-${tv.id}${tv.name}`} show={{ ...tv, title: tv.name, year: tv.first_air_date, media_type: "tv" }} />
                    ))}
                </div>
            </section>

        </div>
    )
}

export default Home