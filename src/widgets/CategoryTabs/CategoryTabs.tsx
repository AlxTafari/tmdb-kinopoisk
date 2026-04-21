import type {Category} from "@/features/movies/api/moviesApi.ts";
import {CATEGORIES} from "@/shared/constants/categories.ts";
import styles from './CategoryTabs.module.css';

type Props = {
    activeCategory: Category;
    onCategoryChange: (category: Category) => void;
};

export const CategoryTabs = ({activeCategory, onCategoryChange}: Props) => {
    return (
        <div className={styles.tabs}>
            {CATEGORIES.map((tab) => (
                <button
                    className={tab.key === activeCategory ? `${styles.tab} ${styles.active}` : styles.tab}
                    key={tab.key}
                    onClick={() => onCategoryChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}; 