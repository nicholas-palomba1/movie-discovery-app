export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string
}

export interface MovieResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

