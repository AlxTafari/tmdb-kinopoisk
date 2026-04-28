import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'

export function useGlobalLoading(): boolean {
    return useSelector((state: RootState) =>
        Object.values(state.tmdbApi.queries).some(q => q?.status === 'pending')
    )
}
