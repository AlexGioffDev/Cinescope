import axios from "axios";
import type { TMDBResponse, MovieResponse, TvResponse, MovieFilter, SeriesFilters, CreditsResponse, TrailerResponse, SearchResult, Series, Movie } from "../types/tmdb";

const client = axios.create({
    baseURL: import.meta.env.VITE_TMDB_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY
    }
});

export const getTrendingMovies = async (): Promise<TMDBResponse<MovieResponse>> => {
    const response = await client.get<TMDBResponse<MovieResponse>>('/trending/movie/week');
    return response.data;
}

export const getPopularMovies = async (): Promise<TMDBResponse<MovieResponse>> => {
    const response = await client.get<TMDBResponse<MovieResponse>>('/movie/popular');
    return response.data;
}

export const getTopRatedMovies = async (): Promise<TMDBResponse<MovieResponse>> => {
    const response = await client.get<TMDBResponse<MovieResponse>>('/movie/top_rated');
    return response.data;
}

export const getUpcomingMovies = async (): Promise<TMDBResponse<MovieResponse>> => {
    const response = await client.get<TMDBResponse<MovieResponse>>('/movie/upcoming');
    return response.data;
}

export const getTrendingSeries = async (): Promise<TMDBResponse<TvResponse>> => {
    const response = await client.get<TMDBResponse<TvResponse>>('/trending/tv/week');
    return response.data;
}

export const getPopularSeries = async (): Promise<TMDBResponse<TvResponse>> => {
    const response = await client.get<TMDBResponse<TvResponse>>('/tv/popular');
    return response.data;
}

export const getTopRatedSeries = async (): Promise<TMDBResponse<TvResponse>> => {
    const response = await client.get<TMDBResponse<TvResponse>>('/tv/top_rated');
    return response.data;
}

export const getMovies = async (page: number, filters?: MovieFilter): Promise<TMDBResponse<MovieResponse>> => {
    const response = await client.get('/discover/movie', {
        params: { page, ...filters }
    });
    return response.data;
}

export const getSeries = async (page: number, filters?: SeriesFilters): Promise<TMDBResponse<TvResponse>> => {
    const response = await client.get('discover/tv', {
        params: { page, ...filters }
    });
    return response.data;
}

export const getMovie = async (id: number): Promise<Movie> => {
    const response = await client.get<Movie>(`/movie/${id}`);
    return response.data;
}

export const getCreditMovie = async (id: number): Promise<CreditsResponse> => {
    const response = await client.get<CreditsResponse>(`/movie/${id}/credits`);
    return response.data;
}

export const getTrailersMovie = async (id: number): Promise<TrailerResponse> => {
    const response = await client.get<TrailerResponse>(`/movie/${id}/videos`);
    return response.data;
}

export const getRecommendationsMovie = async (id: number): Promise<MovieResponse[]> => {
    const response = await client.get<TMDBResponse<MovieResponse>>(`/movie/${id}/recommendations`);
    return response.data.results;
}

export const getSerie = async (id: number): Promise<Series> => {
    const response = await client.get<Series>(`/tv/${id}`);
    return response.data;
}

export const getCreditSeries = async (id: number): Promise<CreditsResponse> => {
    const response = await client.get<CreditsResponse>(`/tv/${id}/credits`);
    return response.data;
}

export const getTrailersSeries = async (id: number): Promise<TrailerResponse> => {
    const response = await client.get<TrailerResponse>(`/tv/${id}/videos`);
    return response.data;
}

export const getRecommendationsSeries = async (id: number): Promise<TvResponse[]> => {
    const response = await client.get<TMDBResponse<TvResponse>>(`/tv/${id}/recommendations`);
    return response.data.results;
}

export const searchMulti = async (query: string): Promise<SearchResult[]> => {
    const response = await client.get<TMDBResponse<SearchResult>>('/search/multi', {
        params: { query }
    });
    return response.data.results.filter(r => r.media_type === 'movie' || r.media_type === 'tv')
}