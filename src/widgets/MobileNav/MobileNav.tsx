import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Home, LayoutGrid, Search, Filter, Heart } from 'lucide-react'
import { Path } from '@/shared/constants/paths'
import styles from './MobileNav.module.scss'

const NAV_ITEMS = [
  { to: Path.Main, label: 'Home', icon: Home, matchPrefix: null, end: true },
  { to: Path.CategoryDefault, label: 'Category', icon: LayoutGrid, matchPrefix: '/category', end: false },
  { to: Path.Search, label: 'Search', icon: Search, matchPrefix: null, end: false },
  { to: Path.Filtered, label: 'Filter', icon: Filter, matchPrefix: null, end: false },
  { to: Path.Favorites, label: 'Favorites', icon: Heart, matchPrefix: null, end: false },
]

export function MobileNav() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ to, label, icon: Icon, matchPrefix, end }) => {
        const prefixActive = matchPrefix ? pathname.startsWith(matchPrefix) : undefined

        return (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              (prefixActive !== undefined ? prefixActive : isActive)
                ? `${styles.item} ${styles.active}`
                : styles.item
            }
          >
            <Icon size={22} />
            <span className={styles.label}>{label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
