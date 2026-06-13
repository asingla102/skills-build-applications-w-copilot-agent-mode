import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Track activity, build teams, and keep students moving.</h1>
        <p className="lead">
          A modern fitness workspace for logging workouts, comparing progress,
          and generating personalized guidance across the school community.
        </p>

        <div className="cta-row">
          <button type="button" className="btn btn-warning btn-lg">
            Start logging
          </button>
          <button type="button" className="btn btn-outline-light btn-lg">
            View leaderboard
          </button>
        </div>

        <dl className="stats-grid">
          <div>
            <dt>Activity types</dt>
            <dd>Run, walk, strength</dd>
          </div>
          <div>
            <dt>Port</dt>
            <dd>5173 frontend, 8000 API</dd>
          </div>
          <div>
            <dt>Data store</dt>
            <dd>MongoDB on 27017</dd>
          </div>
        </dl>
      </section>

      <section className="feature-grid" aria-label="OctoFit features">
        <article>
          <h2>User profiles</h2>
          <p>Track individual goals, activity history, and achievement badges.</p>
        </article>
        <article>
          <h2>Team management</h2>
          <p>Create teams for classes, houses, or challenges with shared goals.</p>
        </article>
        <article>
          <h2>Competitive leaderboard</h2>
          <p>Surface the students and teams making the strongest progress.</p>
        </article>
        <article>
          <h2>Workout suggestions</h2>
          <p>Generate personalized next-step recommendations based on activity data.</p>
        </article>
      </section>
    </main>
  )
}

export default App
