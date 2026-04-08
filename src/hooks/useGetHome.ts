/* eslint-disable react-hooks/purity */
import { useQueries } from "@tanstack/react-query";
import { getPopularMovies, getPopularSeries, getTopRatedMovies, getTopRatedSeries, getTrendingMovies, getTrendingSeries, getUpcomingMovies } from "../lib/tmdb";
import type { HeroItem } from "../types/tmdb";

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
    const trendingMovies = results[0].data;
    const trendingSeries = results[1].data;

    const heroItem: HeroItem | null = (() => {
        if (!trendingMovies?.results || !trendingSeries?.results) return null
        const combined = [
            ...trendingMovies.results.map(m => ({ id: m.id, title: m.title, backdrop_path: m.backdrop_path, media_type: 'movie' as const, genres: m.genre_ids, poster_path: m.poster_path })),
            ...trendingSeries.results.map(s => ({ id: s.id, title: s.name, backdrop_path: s.backdrop_path, media_type: 'tv' as const, genres: s.genre_ids, poster_path: s.poster_path }))
        ]
        return combined[Math.floor(Math.random() * combined.length)]
    })()

    return {
        heroItem,
        trendingMovies,
        trendingSeries,
        popularMovies: results[2].data,
        popularSeries: results[3].data,
        topRatedMovies: results[4].data,
        topRatedSeries: results[5].data,
        upcomingMovies: results[6].data,
        isLoading,
        isError
    }
}