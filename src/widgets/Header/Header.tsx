import { NavLink, Link } from 'react-router-dom'
import { Path } from '@/shared/constants/paths'
import tmdbLogo from '@/shared/assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
import styles from './Header.module.css'

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.CategoryDefault, label: 'Category' },
  { to: Path.Filtered, label: 'Filtered' },
  { to: Path.Search, label: 'Search' },
  { to: Path.Favorites, label: 'Favorites' },
]

export function Header() {
  return (
    <header className={styles.header}>
      <Link to={Path.Main} className={styles.logo}>
        <img src={tmdbLogo} alt="TMDB" height={20} />
      </Link>

      <nav className={styles.nav}>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <button className={styles.themeToggle} aria-label="Toggle theme">
        🌙
      </button>
    </header>
  )
}
