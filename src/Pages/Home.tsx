import CardSection from '../Components/Cards/CardSection';
import Hero from '../Components/Hero/Hero';
import { useTrendingAll, } from '../hooks/useGetHome'
import type { MovieResponse, TvResponse } from '../types/tmdb';

const Home = () => {
    const { isLoading, isError, heroItem, trendingMovies, trendingSeries, popularMovies, popularSeries, topRatedMovies, topRatedSeries, upcomingMovies } = useTrendingAll();

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading data</p>

    type SectionItem = MovieResponse | TvResponse;

    const sections: {
        label: string;
        items: SectionItem[] | undefined;
        type: 'movie' | 'tv';
        keyField: 'title' | 'name';
        dateField: 'release_date' | 'first_air_date';
    }[] = [
            { label: "Trending Movies", items: trendingMovies?.results, type: "movie", keyField: "title", dateField: "release_date" },
            { label: "Trending TV Series", items: trendingSeries?.results, type: "tv", keyField: "name", dateField: "first_air_date" },
            { label: "Upcoming Movies", items: upcomingMovies?.results, type: "movie", keyField: "title", dateField: "release_date" },
            { label: "Popular Movies", items: popularMovies?.results, type: "movie", keyField: "title", dateField: "release_date" },
            { label: "Popular TV Series", items: popularSeries?.results, type: "tv", keyField: "name", dateField: "first_air_date" },
            { label: "Top Rated Movies", items: topRatedMovies?.results, type: "movie", keyField: "title", dateField: "release_date" },
            { label: "Top Rated TV Series", items: topRatedSeries?.results, type: "tv", keyField: "name", dateField: "first_air_date" },
        ];

    return (
        <div className='space-y-10'>
            <Hero show={heroItem} />
            <div className="max-w-7xl mx-auto w-full px-4 space-y-10">
                {sections.map(({ label, items, type }) => (
                    <section key={label} className='space-y-4'>
                        <h2 className='text-stone-500 uppercase font-semibold text-xl'>{label}</h2>
                        <div className='pb-2 flex items-center gap-3 overflow-x-auto scrollbar-thin'>
                            {items?.map((item: SectionItem) => (
                                <CardSection
                                    key={`${type}-${label}-${item.id}`}
                                    show={{
                                        ...item,
                                        title: item.media_type === 'movie' ? item.title : item.name,
                                        year: item.media_type === 'movie' ? item.release_date : item.first_air_date,
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