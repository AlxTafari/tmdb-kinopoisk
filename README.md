# CineBase

A movie browser application built on top of the [TMDB API](https://www.themoviedb.org/). Browse trending movies, filter by genre and rating, search for titles, dive into cast pages, and save your favorites — all with a persistent dark/light theme.

---

## Features

- **Home page** — four curated movie rows: Popular, Top Rated, Upcoming, Now Playing
- **Category pages** — full paginated lists for each category
- **Advanced filtering** — sort by rating/popularity/release, multi-select genres, rating range slider
- **Search** — full-text movie search with URL query sync (`?query=`)
- **Movie detail** — hero backdrop, metadata, cast (linkable), similar movies
- **Actor detail** — biography, filmography grid
- **Favorites** — add/remove via heart button, persisted to `localStorage`
- **Dark / light theme** — toggle with system preference fallback, persisted to `localStorage`
- **Skeleton loading** — per-component skeleton screens
- **Global loader** — linear progress bar for in-flight API requests
- **Error handling** — typed toast notifications (network, auth, 404, server, schema mismatch)
- **Responsive layout** — mobile-friendly header with burger menu

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| UI | React 19, SCSS Modules |
| Language | TypeScript 5.9 (strict mode) |
| Bundler | Vite 8 + SWC |
| State / Data | Redux Toolkit 2, RTK Query |
| Routing | React Router 7 |
| Schema validation | Zod 4 |
| Notifications | react-toastify |
| Skeleton UI | react-loading-skeleton |
| Slider input | rc-slider |
| Package manager | pnpm |

---

## Project Structure

Feature-Sliced Design (FSD):

```
src/
├── app/          # Store, base API, routing
├── pages/        # Route-level components
├── widgets/      # Composite UI blocks (Header, Footer, MoviesRow, …)
├── features/     # Self-contained features with logic
│   ├── movies/         # Category & search endpoints
│   ├── filter-movies/  # Discover API + filter UI
│   ├── actor-detail/   # Actor endpoints
│   ├── favorites/      # Redux slice + localStorage sync
│   └── theme/          # Theme slice + localStorage sync
├── entities/     # Domain schemas (Zod) and dumb UI (MovieCard, …)
└── shared/       # Constants, hooks, utils, base components
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm

### Installation

```bash
git clone https://github.com/your-username/tmdb-kinopoisk.git
cd tmdb-kinopoisk
pnpm install
```

### Environment

Create `.env.local` in the project root:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=your_read_access_token
VITE_TMDB_API_KEY=your_api_key
```

Get your credentials at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

### Run

```bash
pnpm dev      # Dev server with HMR
pnpm build    # Type-check + production build
pnpm preview  # Preview production build
pnpm lint     # ESLint
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/category/:category` | Category (popular / top_rated / upcoming / now_playing) |
| `/filtered` | Filtered results |
| `/search` | Search |
| `/favorites` | Favorites |
| `/movie/:id` | Movie detail |
| `/actor/:id` | Actor detail |
| `*` | 404 |

---

## API Layer

All requests go through RTK Query. Each endpoint is wrapped with two middleware layers:

1. **Zod validation** — response shape is checked against a typed schema; mismatches surface as a toast error instead of a runtime crash
2. **Error handling** — maps HTTP status codes and network failures to human-readable notifications

```ts
// Usage example
getMoviesByCategory.initiate('popular', {
  extraOptions: { dataSchema: MoviesListSchema }
})
```

---

## Data courtesy of TMDB

This product uses the TMDB API but is not endorsed or certified by TMDB.
