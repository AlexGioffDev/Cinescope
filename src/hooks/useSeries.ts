import { useInfiniteQuery } from "@tanstack/react-query";
import { getSeries } from "../lib/tmdb";
import type { SeriesFilters } from "../types/tmdb";

export const useSeries = (filters?: SeriesFilters) => {
    return useInfiniteQuery({
        queryKey: ['series', filters],
        queryFn: ({pageParam}) => getSeries(pageParam, filters),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if(lastPage.page < lastPage.total_pages){
                return lastPage.page + 1
            }
            return undefined
        }
    })
}