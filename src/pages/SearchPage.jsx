import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchPage() {
  const [usernameInput, setUsernameInput] = useState('')
  const navigate = useNavigate()

  function onSearch(event) {
    event.preventDefault()
    const username = usernameInput.trim()
    if (username) navigate(`/user/${username}`)
  }

  return (
    <div className="hero-search d-flex flex-column align-items-center justify-content-center text-white px-3 py-5">
      <i className="bi bi-github display-1 mb-3 opacity-75"></i>
      <h1 className="fs-2 fw-bold mb-2">GitHub Explorer</h1>
      <p className="text-secondary mb-4">Explore repositórios de qualquer usuário do GitHub</p>
      <form className="d-flex gap-2 w-100" style={{ maxWidth: 500 }} onSubmit={onSearch}>
        <input
          className="form-control form-control-lg"
          placeholder="Digite um nome de usuário..."
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          autoFocus
          aria-label="Nome de usuário no GitHub"
        />
        <button className="btn btn-primary btn-lg px-4" type="submit">
          <i className="bi bi-search me-1"></i>
          Buscar
        </button>
      </form>
    </div>
  )
}
