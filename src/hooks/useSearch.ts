import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { searchMulti } from "../lib/tmdb";

export const useSearch = (query: string) => {
    const [queryValue, setQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => setQuery(query), 500);
        return () => clearTimeout(timer);
    }, [query])

    return useQuery({
        queryKey: ['search', queryValue],
        queryFn: () => searchMulti(queryValue),
        enabled: queryValue.trim().length > 0
    });
}