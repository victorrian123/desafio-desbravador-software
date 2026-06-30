import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage'
import RepoPage from './pages/RepoPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/user/:username/repo/:reponame" element={<RepoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="py-3 text-center text-muted small border-top">
        GitHub Explorer &mdash; Desbravador Software Challenge
      </footer>
    </div>
  )
}

export default App
