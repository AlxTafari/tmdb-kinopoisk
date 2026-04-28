import { toast } from 'react-toastify'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import type { ZodSchema } from 'zod'

type TBaseQuery = BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    { dataSchema?: ZodSchema },
    FetchBaseQueryMeta
>

export const baseQueryWithErrorHandling =
    (baseQuery: TBaseQuery): TBaseQuery =>
    async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)

        if (!result.error) return result

        const err = result.error

        // Zod-ошибка (пришла из baseQueryWithZodValidation)
        if (err.status === 'CUSTOM_ERROR' && err.error === 'ZOD_VALIDATION_ERROR') {
            toast.error('Неожиданный формат данных от сервера', { toastId: 'ZOD_ERROR' })
            return result
        }

        // Сетевая ошибка (нет интернета / сервер недоступен)
        if (err.status === 'FETCH_ERROR') {
            toast.error('Нет подключения к сети', { toastId: 'FETCH_ERROR' })
            return result
        }

        // HTTP-ошибки
        if (typeof err.status === 'number') {
            if (err.status === 401) {
                toast.error('Ошибка авторизации — проверь токен', { toastId: '401' })
            } else if (err.status === 404) {
                toast.error('Ресурс не найден (404)', { toastId: '404' })
            } else {
                toast.error(`Ошибка сервера: ${err.status}`, { toastId: String(err.status) })
            }
        }

        return result
    }
