import { useNavigate } from 'react-router-dom'
import { Path } from '@/shared/constants/paths'
import styles from './NotFound.module.css'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404 — Not Found</h1>
      <button className={styles.button} onClick={() => navigate(Path.Main)}>
        Back to Home
      </button>
    </div>
  )
}
