import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "../lib/tmdb";
import type { MovieFilter } from "../types/tmdb";

export const useMovies = (filters?: MovieFilter) => {
    return useInfiniteQuery({
        queryKey: ['movies', filters],
        queryFn: ({ pageParam }) => getMovies(pageParam, filters),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        }
    });
}