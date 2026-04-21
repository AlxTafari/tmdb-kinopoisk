import {z} from "zod";

const GenreSchema = z.object ({
    id: z.number(),
    name: z.string(),
})

export const GenresListSchema = z.object({
    genres: z.array(GenreSchema)
})

export type GenresList = z.infer<typeof GenresListSchema>