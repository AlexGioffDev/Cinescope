export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface MovieResponse {
    id: number;
    title: string;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
    media_type: 'movie';
    vote_average: number;
    genre_ids: number[];
    release_date: string;
}

interface TvCreator {
    id: number
    name: string
    profile_path: string | null
}

export interface TvResponse {
    id: number;
    name: string;
    backdrop_path: string | null;
    poster_path: string | null;
    overview: string;
    media_type: 'tv';
    vote_average: number;
    genre_ids: number[];
    first_air_date: string;
    created_by: TvCreator[]

}

export interface MovieFilter {
    with_genres?: number;
    "vote_average.gte"?: number;
    sort_by?:
    | "popularity.desc"
    | "vote_average.desc"
    | "primary_release_date.desc";
    "primary_release_date.gte"?: string;
    "primary_release_date.lte"?: string;
}

export interface SeriesFilters {
    with_genres?: number;
    "vote_average.gte"?: number;
    sort_by?: "popularity.desc" | "vote_average.desc" | "first_air_date.desc";
    "first_air_date.gte"?: string;
    "first_air_date.lte"?: string;
}

interface CastMember {
    id: number
    name: string,
    character: string,
    profile_path: string | null,
    order: number
}

interface CrewMember {
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
}

export interface CreditsResponse {
    id: number,
    crew: CrewMember[],
    cast: CastMember[]
}

interface Trailer {
    id: number,
    key: string,
    type: string,
    site: string,
    name: string
}

export interface TrailerResponse {
    id: number,
    results: Trailer[]
}

interface Genre {
    id: number,
    name: string
}

interface ProductionCountry {
    iso_3166_1: string,
    name: string

}

export interface Movie extends MovieResponse {
    credits: CreditsResponse,
    trailer: TrailerResponse | null,
    recommendations: MovieResponse[],
    genres: Genre[],
    budget: number,
    revenue: number,
    production_countries: ProductionCountry[]
}

interface Network {
    id: number
    name: string
    logo_path: string | null
}

interface Episode {
    id: number
    name: string
    overview: string
    vote_average: number
    air_date: string
}

export interface Series extends TvResponse {
    credits: CreditsResponse,
    trailer: TrailerResponse | null,
    recommendations: TvResponse[],
    genres: Genre[],
    production_countries: ProductionCountry[]
    number_of_seasons: number
    number_of_episodes: number
    status: string
    tagline: string
    in_production: boolean
    networks: Network[]
    last_episode_to_air: Episode | null
}

export type SearchResult = (
    MovieResponse & { media_type: 'movie' }
) | (TvResponse & { media_type: 'tv' })

export type HeroItem = {
    id: number
    title: string
    backdrop_path: string | null
    media_type: 'movie' | 'tv',
    genres: number[],
    poster_path: string | null
}

export type ShowCard = {
    id: number
    title: string
    poster_path: string | null
    overview: string
    vote_average: number
    year: string
    media_type: 'movie' | 'tv'
}