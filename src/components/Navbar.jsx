import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  function onSearch(event) {
    event.preventDefault()
    const username = searchInput.trim()
    if (username) {
      navigate(`/user/${username}`)
      setSearchInput('')
    }
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
        <i className="bi bi-github fs-4"></i>
        <span className="fw-semibold">GitHub Explorer</span>
      </Link>
      <form className="d-flex gap-2" onSubmit={onSearch}>
        <input
          className="form-control form-control-sm"
          style={{ width: 220 }}
          placeholder="Search user..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          aria-label="Search GitHub user"
        />
        <button className="btn btn-outline-light btn-sm" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </nav>
  )
}
