import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchUser, fetchUserRepos } from '../services/github'
import RepoCard from '../components/RepoCard'
import UserCard from '../components/UserCard'
import ErrorAlert from '../components/ErrorAlert'

const sortOptions = [
  { value: 'stars_desc', label: 'Mais estrelas' },
  { value: 'stars_asc', label: 'Menos estrelas' },
  { value: 'name_asc', label: 'Nome (A-Z)' },
  { value: 'name_desc', label: 'Nome (Z-A)' },
  { value: 'updated_desc', label: 'Atualizado recentemente' },
  { value: 'forks_desc', label: 'Mais forks' },
]

function sortRepos(repos, sortBy) {
  const sorted = [...repos]
  switch (sortBy) {
    case 'stars_desc': return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
    case 'stars_asc': return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count)
    case 'name_asc': return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name_desc': return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'updated_desc': return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    case 'forks_desc': return sorted.sort((a, b) => b.forks_count - a.forks_count)
    default: return sorted
  }
}

export default function UserPage() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState('stars_desc')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    setUser(null)
    setRepos([])

    Promise.all([fetchUser(username), fetchUserRepos(username)])
      .then(([userData, userRepos]) => {
        setUser(userData)
        setRepos(userRepos)
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('Usuário não encontrado.')
        } else {
          setError('Erro ao carregar dados. Tente novamente.')
        }
      })
      .finally(() => setLoading(false))
  }, [username])

  const visibleRepos = useMemo(() => {
    const filtered = filterText
      ? repos.filter((repo) =>
          repo.name.toLowerCase().includes(filterText.toLowerCase()) ||
          (repo.description || '').toLowerCase().includes(filterText.toLowerCase())
        )
      : repos
    return sortRepos(filtered, sortBy)
  }, [repos, sortBy, filterText])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    )
  }

  if (error) return <ErrorAlert message={error} />

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-3">
          <UserCard user={user} />
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <h5 className="mb-0 me-auto">
              Repositórios
              <span className="badge bg-secondary ms-2">{repos.length}</span>
            </h5>
            <input
              className="form-control form-control-sm"
              style={{ width: 200 }}
              placeholder="Filtrar repositórios..."
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
              aria-label="Filtrar repositórios"
            />
            <select
              className="form-select form-select-sm"
              style={{ width: 200 }}
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Ordenar por"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          {visibleRepos.length === 0 ? (
            <p className="text-muted">Nenhum repositório encontrado.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {visibleRepos.map((repo) => (
                <div className="col" key={repo.id}>
                  <Link
                    to={`/user/${username}/repo/${repo.name}`}
                    className="text-decoration-none"
                  >
                    <RepoCard repo={repo} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
