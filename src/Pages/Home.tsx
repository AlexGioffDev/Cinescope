import CardSection from '../Components/Cards/CardSection';
import Hero from '../Components/Hero/Hero';
import { useTrendingAll, } from '../hooks/useGetHome'

const Home = () => {
    const { isLoading, isError, heroItem, trendingMovies, trendingSeries, popularMovies, popularSeries, topRatedMovies, topRatedSeries, upcomingMovies } = useTrendingAll();

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading data</p>

    const sections = [
        { label: "Trending Movies", items: trendingMovies?.results, type: "movie" as const, keyField: "title" as const, dateField: "release_date" as const },
        { label: "Trending TV Series", items: trendingSeries?.results, type: "tv" as const, keyField: "name" as const, dateField: "first_air_date" as const },
        { label: "Upcoming Movies", items: upcomingMovies?.results, type: "movie" as const, keyField: "title" as const, dateField: "release_date" as const },
        { label: "Popular Movies", items: popularMovies?.results, type: "movie" as const, keyField: "title" as const, dateField: "release_date" as const },
        { label: "Popular TV Series", items: popularSeries?.results, type: "tv" as const, keyField: "name" as const, dateField: "first_air_date" as const },
        { label: "Top Rated Movies", items: topRatedMovies?.results, type: "movie" as const, keyField: "title" as const, dateField: "release_date" as const },
        { label: "Top Rated TV Series", items: topRatedSeries?.results, type: "tv" as const, keyField: "name" as const, dateField: "first_air_date" as const },
    ];

    return (
        <div className='space-y-10'>
            <Hero show={heroItem} />
            <div className="max-w-7xl mx-auto w-full px-4 space-y-10">
                {sections.map(({ label, items, type, keyField, dateField }) => (
                    <section key={label} className='space-y-4'>
                        <h2 className='text-stone-500 uppercase font-semibold text-xl'>{label}</h2>
                        <div className='pb-2 flex items-center gap-3 overflow-x-auto scrollbar-thin'>
                            {items?.map((item: any) => (
                                <CardSection
                                    key={`${type}-${label}-${item.id}`}
                                    show={{
                                        ...item,
                                        title: item[keyField],
                                        year: item[dateField],
                                        media_type: type,
                                    }}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default Home;