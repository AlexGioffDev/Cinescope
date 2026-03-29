import { useQueries } from "@tanstack/react-query";
import { getSerie, getCreditSeries, getTrailersSeries, getRecommendationsSeries } from "../lib/tmdb";
import type { Series } from "../types/tmdb";

export const useTv = (id: number) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ['tv', id],
                queryFn: () => getSerie(id)
            },
            {
                queryKey: ['tv', id, 'credits'],
                queryFn: () => getCreditSeries(id)
            },
            {
                queryKey: ['tv', id, 'trailer'],
                queryFn: () => getTrailersSeries(id)
            },
            {
                queryKey: ['tv', id, 'recommendations'],
                queryFn: () => getRecommendationsSeries(id)
            }
        ]
    });

    const isLoading = results.some(r => r.isLoading);
    const isError = results.some(r => r.isError);

    const series: Series | null = results[0].data && results[1].data && results[2].data && results[3].data ?
        {
            ...results[0].data,
            credits: results[1].data,
            trailer: results[2].data,
            recommendations: results[3].data
        } : null;

    return {
        series,
        isLoading,
        isError
    }
}