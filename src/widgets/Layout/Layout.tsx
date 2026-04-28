import { Outlet } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Header } from '@/widgets/Header/Header'
import { Footer } from '@/widgets/Footer/Footer'
import { GlobalLoader } from '@/widgets/GlobalLoader/GlobalLoader'
import { useAppSelector } from '@/shared/hooks'
import styles from './Layout.module.scss'

export function Layout() {
  const theme = useAppSelector(state => state.theme.theme)
  const isDark = theme === 'dark'

  return (
    <SkeletonTheme
      baseColor={isDark ? '#252525' : '#e0e0e0'}
      highlightColor={isDark ? '#333333' : '#efefef'}
    >
      <div className={styles.layout}>
        <Header />
        <GlobalLoader />
        <main className={styles.main}>
          <div className={styles.container}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </SkeletonTheme>
  )
}
