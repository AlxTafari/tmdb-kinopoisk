import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ToastContainer } from 'react-toastify'
import { Header } from '@/widgets/Header/Header'
import { MobileNav } from '@/widgets/MobileNav/MobileNav'
import { Footer } from '@/widgets/Footer/Footer'
import { GlobalLoader } from '@/widgets/GlobalLoader/GlobalLoader'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary/ErrorBoundary'
import { useAppSelector } from '@/shared/hooks'
import styles from './Layout.module.scss'

export function Layout() {
  const theme = useAppSelector(state => state.theme.theme)
  const isDark = theme === 'dark'
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <SkeletonTheme
      baseColor={isDark ? '#252525' : '#e0e0e0'}
      highlightColor={isDark ? '#333333' : '#efefef'}
    >
      <div className={styles.layout}>
        <Header />
        <GlobalLoader />
        <main className={styles.main}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        <MobileNav />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        theme={isDark ? 'dark' : 'light'}
      />
    </SkeletonTheme>
  )
}
