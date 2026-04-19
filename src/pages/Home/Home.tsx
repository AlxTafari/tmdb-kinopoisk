import { WelcomeSection } from '@/widgets/WelcomeSection/WelcomeSection'
import { MoviesRow } from '@/widgets/MoviesRow/MoviesRow'
import styles from './Home.module.css'
import {CATEGORIES} from "@/shared/constants/categories.ts";

export function Home() {
  return (
    <main className={styles.main}>
      <WelcomeSection />
      <div className={styles.rows}>
          {CATEGORIES.map((cat) => (
              <MoviesRow key={cat.key} title={cat.label} category={cat.key} />
          ))}
      </div>
    </main>
  )
}
