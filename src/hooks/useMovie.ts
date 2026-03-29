import { useQueries } from "@tanstack/react-query";
import { getMovie, getCreditMovie, getTrailersMovie, getRecommendationsMovie } from "../lib/tmdb";
import type { Movie } from "../types/tmdb";

export const useMovie = (id: number) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['movie', id],
                queryFn: () => getMovie(id)
            },
            {
                queryKey: ['movie', 'credit', id],
                queryFn: () => getCreditMovie(id)
            },
            {
                queryKey: ['movie', 'trailer', id],
                queryFn: () => getTrailersMovie(id)
            },
            {
                queryKey: ['movie', 'recommendations', id],
                queryFn: () => getRecommendationsMovie(id)
            }
        ]
    });

    const isError = results.some(r => r.isError);
    const isLoading = results.some(r => r.isLoading);

    const movie: Movie | null = results[0].data && results[1].data && results[2].data && results[3].data ? {
        ...results[0].data,
        credits: results[1].data,
        trailer: results[2].data,
        recommendations: results[3].data
    } : null;

    return {
        movie,
        isError,
        isLoading
    }
}