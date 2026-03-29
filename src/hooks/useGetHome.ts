import { useQueries } from "@tanstack/react-query";
import { getPopularMovies, getPopularSeries, getTopRatedMovies, getTopRatedSeries, getTrendingMovies, getTrendingSeries, getUpcomingMovies } from "../lib/tmdb";

export const useTrendingAll = () => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['trending', 'movies'],
                queryFn: getTrendingMovies
            },
            {
                queryKey: ['trending', 'series'],
                queryFn: getTrendingSeries
            },
            {
                queryKey: ['popular', 'movies'],
                queryFn: getPopularMovies
            },
            {
                queryKey: ['popular', 'series'],
                queryFn: getPopularSeries
            },
            {
                queryKey: ['topRated', 'movies'],
                queryFn: getTopRatedMovies
            },
            {
                queryKey: ['topRated', 'series'],
                queryFn: getTopRatedSeries
            },
            {
                queryKey: ['upcoming', 'movies'],
                queryFn: getUpcomingMovies
            },
        ]
    });

    const isLoading = results.some(r => r.isLoading);
    const isError = results.some(r => r.isError);

    return {
        trendingMovies: results[0].data,
        trendingSeries: results[1].data,
        popularMovies: results[2].data,
        popularSeries: results[3].data,
        topRatedMovies: results[4].data,
        topRatedSeries: results[5].data,
        upcomingMovies: results[6].data,
        isLoading,
        isError
    }
}