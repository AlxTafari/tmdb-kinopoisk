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
      const parsed = zodSchema.safeParse(data)
      if (!parsed.success) {
        console.table(parsed.error.issues)
        return {
          error: {
            status: 'CUSTOM_ERROR' as const,
            error: 'ZOD_VALIDATION_ERROR',
            data: parsed.error.issues,
          },
        }
      }
    }

    return returnValue
  }
