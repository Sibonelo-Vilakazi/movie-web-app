export class Endpoints{
    static MOVIES: string = 'discover/movie';
    static TV_SHOWS: string = 'discover/tv'
    static MOVIE_ID = (movie_id: string) => `movie/${movie_id}`;
    static TV_SHOW_ID = (series_id: string) => `tv/${series_id}`;
    static TRENDS: string = 'trending/all/day?language=en-US'
    static IMAGE_BASE: string = 'https://image.tmdb.org/t/p/'
}  