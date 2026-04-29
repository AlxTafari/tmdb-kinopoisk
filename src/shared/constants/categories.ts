import type {Category} from "@/features/movies/api/moviesApi.ts";

export const CATEGORIES: { key: Category; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'top_rated', label: 'Top Rated' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'now_playing', label: 'Now Playing' },
]