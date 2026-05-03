import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Path } from '@/shared/constants/paths'
import tmdbLogo from '@/shared/assets/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { toggleTheme } from '@/features/theme/themeSlice'
import styles from './Header.module.scss'

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.CategoryDefault, label: 'Category' },
  { to: Path.Filtered, label: 'Filtered' },
  { to: Path.Search, label: 'Search' },
  { to: Path.Favorites, label: 'Favorites' },
]

export function Header() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={Path.Main} className={styles.logo} onClick={closeMenu}>
          <img src={tmdbLogo} alt="TMDB" height={20} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            aria-label="Toggle theme"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}
    </header>
  )
}
