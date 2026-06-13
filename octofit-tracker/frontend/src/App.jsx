import { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { fetchJson, getApiBaseUrl } from './lib/api.js'

const initialDataState = {
  health: null,
  users: [],
  teams: [],
  activities: [],
  workouts: [],
  leaderboard: [],
}

function App() {
  const [data, setData] = useState(initialDataState)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const [health, users, teams, activities, workouts, leaderboard] = await Promise.all([
          fetchJson('/api/health'),
          fetchJson('/api/users'),
          fetchJson('/api/teams'),
          fetchJson('/api/activities'),
          fetchJson('/api/workouts'),
          fetchJson('/api/leaderboard'),
        ])

        if (!isMounted) {
          return
        }

        setData({ health, users, teams, activities, workouts, leaderboard })
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : 'Unable to load API data')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const summaryCards = useMemo(
    () => [
      { label: 'Users', value: data.users.length },
      { label: 'Teams', value: data.teams.length },
      { label: 'Activities', value: data.activities.length },
      { label: 'Workouts', value: data.workouts.length },
    ],
    [data.activities.length, data.teams.length, data.users.length, data.workouts.length],
  )

  const statusLabel = errorMessage
    ? 'Disconnected'
    : isLoading
      ? 'Syncing'
      : data.health?.ok
        ? 'Connected'
        : 'Unknown'

  return (
    <main className="app-shell">
      <nav className="topbar">
        <div>
          <p className="eyebrow">OctoFit Tracker</p>
          <span className={`status-pill status-${statusLabel.toLowerCase()}`}>{statusLabel}</span>
        </div>
        <div className="topbar-links">
          <Link to="/">Dashboard</Link>
          <Link to="/explorer">Explorer</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <section className="hero-panel">
              <h1>Track activity, build teams, and keep students moving.</h1>
              <p className="lead">
                A modern fitness workspace for logging workouts, comparing progress,
                and generating personalized guidance across the school community.
              </p>

              <div className="cta-row">
                <a className="btn btn-warning btn-lg" href={`${getApiBaseUrl()}/api/health`}>
                  Check API
                </a>
                <Link className="btn btn-outline-light btn-lg" to="/explorer">
                  View live data
                </Link>
              </div>

              <dl className="stats-grid">
                <div>
                  <dt>Port</dt>
                  <dd>5173 frontend, 8000 API</dd>
                </div>
                <div>
                  <dt>Data store</dt>
                  <dd>MongoDB on 27017</dd>
                </div>
                <div>
                  <dt>API base</dt>
                  <dd>{getApiBaseUrl()}</dd>
                </div>
              </dl>
            </section>
          }
        />
        <Route
          path="/explorer"
          element={
            <section className="feature-grid explorer-grid" aria-label="OctoFit data explorer">
              <article>
                <h2>Live summary</h2>
                {summaryCards.map((card) => (
                  <div className="summary-row" key={card.label}>
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                  </div>
                ))}
                {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
              </article>

              <article>
                <h2>Recent users</h2>
                {data.users.length > 0 ? (
                  <ul className="data-list">
                    {data.users.slice(0, 3).map((user) => (
                      <li key={user._id}>
                        <strong>{user.displayName}</strong>
                        <span>{user.email}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No users yet.</p>
                )}
              </article>

              <article>
                <h2>Recent workouts</h2>
                {data.workouts.length > 0 ? (
                  <ul className="data-list">
                    {data.workouts.slice(0, 3).map((workout) => (
                      <li key={workout._id}>
                        <strong>{workout.name}</strong>
                        <span>{workout.focusArea}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No workouts yet.</p>
                )}
              </article>

              <article>
                <h2>Activity routes</h2>
                <p>/api/users, /api/teams, /api/activities, /api/leaderboard, /api/workouts</p>
              </article>
            </section>
          }
        />
      </Routes>
    </main>
  )
}

export default App
