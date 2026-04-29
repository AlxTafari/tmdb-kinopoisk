import {baseApi} from '@/app/baseApi'
import {ActorMovieCreditsSchema, ActorSchema} from '@/entities/actor/actorSchema'
import type {Actor, ActorMovieCredits} from '@/entities/actor/actorSchema'

export const actorApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getActorDetails: build.query<Actor, number>({
            query: (id) => ({url: `/person/${id}`}),
            extraOptions: {dataSchema: ActorSchema},
        }),
        getActorMovieCredits: build.query<ActorMovieCredits, number>({
            query: (id) => ({url: `/person/${id}/movie_credits`}),
            extraOptions: {dataSchema: ActorMovieCreditsSchema},
        }),
    }),
})

export const {useGetActorDetailsQuery, useGetActorMovieCreditsQuery} = actorApi
