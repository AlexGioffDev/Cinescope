import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SearchResult } from "../types/tmdb";

interface WatchlistStore {
    watchlist: SearchResult[]
    addToWatchlist: (item: SearchResult) => void
    removeFromWatchlist: (id: number) => void
    isInWatchlist: (id: number) => boolean
}

export const useWatchListStore = create<WatchlistStore>() (
    persist(
        (set, get) => ({
            watchlist: [],
            addToWatchlist: (item) => set(state => ({
                watchlist: [...state.watchlist, item]
            })),
            removeFromWatchlist: (id) => set(state => ({
                watchlist: state.watchlist.filter(item => item.id !== id)
            })),
            isInWatchlist: (id) => get().watchlist.some(item => item.id === id)
        }),     
        {name: 'watchlist'}
    )
);