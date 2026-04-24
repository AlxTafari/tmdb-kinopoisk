import {useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {type SortBy, useGetGenresMoviesQuery} from "@/features/filter-movies/api/discoverApi.ts";


export const useFilters = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get('sort_by') ?? 'popularity.desc'
    const genres = searchParams.get('with_genres') ?? undefined
    const page = Number(searchParams.get('page')) || 1
    const selectedGenres = genres ? genres.split(',') : []
    const ratingGte = Number(searchParams.get('vote_average.gte')) || 0
    const ratingLte = Number(searchParams.get('vote_average.lte')) || 10

    const {data: genresData} = useGetGenresMoviesQuery()

    // Локальный стейт — только для визуала слайдера
    const [rating, setRating] = useState<number[]>([ratingGte, ratingLte])

    const apiFilters = {
        sort_by: sortBy as SortBy,
        with_genres: genres,
        'vote_average.gte': ratingGte,
        'vote_average.lte': ratingLte,
        page,
    }
    const isFirstRender = useRef(true)

    // Debounce для слайлера: локальный стейт → URL
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return  // при mount — ничего не делаем
        }
        const timer = setTimeout(() => {
            setSearchParams(prev => {
                const next = new URLSearchParams(prev)
                next.set('vote_average.gte', String(rating[0]))
                next.set('vote_average.lte', String(rating[1]))
                next.set('page', '1')
                return next
            }, { replace: true })
        }, 300)

        return () => clearTimeout(timer)
    // setSearchParams стабилен (useCallback внутри React Router) — добавление в deps вызывает баг сброса страницы
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating])

    const resetFilters = () => {
        setRating([0, 10])
        setSearchParams({})
    }

    const setSortBy = (value: string) => {
        setSearchParams(prev => {
            prev.set('sort_by', value)
            prev.set('page', '1')
            return prev
        })
    }

    const toggleGenre = (genreId: number) => {
        const genreIdStr = genreId.toString()
        const updated = selectedGenres.includes(genreIdStr)
            ? selectedGenres.filter(g => g !== genreIdStr)
            : [...selectedGenres, genreIdStr]
        setSearchParams(prev => {
            prev.set('with_genres', updated.join(','))
            prev.set('page', '1')
            return prev
        })
    }

    const setPage = (p: number) => {
        setSearchParams(prev => {
            prev.set('page', String(p))
            return prev
        })
    }

    return {apiFilters, sortBy, setSortBy, genres, page, setPage, selectedGenres,
        ratingGte, ratingLte, rating, setRating, toggleGenre,
        resetFilters, genresData }
}