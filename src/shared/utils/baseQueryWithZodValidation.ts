import { z } from 'zod'
import type { ZodSchema } from 'zod'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'

type TBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: ZodSchema },
  FetchBaseQueryMeta
>

export const baseQueryWithZodValidation =
  (baseQuery: TBaseQuery): TBaseQuery =>
  async (args, api, extraOptions) => {
    const returnValue = await baseQuery(args, api, extraOptions)

    const zodSchema = extraOptions?.dataSchema
    const { data } = returnValue

    if (data && zodSchema) {
      try {
        zodSchema.parse(data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.table(error.issues)
        }
        throw error
      }
    }

    return returnValue
  }
