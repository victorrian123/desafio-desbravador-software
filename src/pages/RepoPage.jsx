import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchRepoDetails, fetchRepoLanguages } from '../services/github'
import ErrorAlert from '../components/ErrorAlert'

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
}

function formatCount(number) {
  if (number >= 1000) return `${(number / 1000).toFixed(1)}k`
  return String(number)
}

export default function RepoPage() {
  const { username, reponame } = useParams()
  const [repo, setRepo] = useState(null)
  const [languages, setLanguages] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    Promise.all([
      fetchRepoDetails(username, reponame),
      fetchRepoLanguages(username, reponame),
    ])
      .then(([repoData, repoLanguages]) => {
        setRepo(repoData)
        setLanguages(repoLanguages)
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('Repositório não encontrado.')
        } else {
          setError('Erro ao carregar dados. Tente novamente.')
        }
      })
      .finally(() => setLoading(false))
  }, [username, reponame])

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

  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)

  return (
    <div className="container py-4" style={{ maxWidth: 800 }}>
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Início</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/user/${username}`}>{username}</Link>
          </li>
          <li className="breadcrumb-item active">{reponame}</li>
        </ol>
      </nav>

      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h2 className="h4 mb-1">
                <i className="bi bi-folder2 me-2 text-secondary"></i>
                {repo.name}
              </h2>
              {repo.full_name && (
                <small className="text-muted">{repo.full_name}</small>
              )}
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark btn-sm"
            >
              <i className="bi bi-github me-1"></i>
              Ver no GitHub
            </a>
          </div>

          {repo.description && (
            <p className="text-muted mb-3">{repo.description}</p>
          )}

          {repo.homepage && (
            <p className="mb-3">
              <i className="bi bi-link-45deg me-1 text-secondary"></i>
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                {repo.homepage}
              </a>
            </p>
          )}

          <div className="d-flex flex-wrap gap-3 mb-4">
            <span title="Estrelas">
              <i className="bi bi-star-fill text-warning me-1"></i>
              {formatCount(repo.stargazers_count)} estrelas
            </span>
            <span title="Forks">
              <i className="bi bi-diagram-2 me-1 text-secondary"></i>
              {formatCount(repo.forks_count)} forks
            </span>
            <span title="Watchers">
              <i className="bi bi-eye me-1 text-secondary"></i>
              {formatCount(repo.watchers_count)} watchers
            </span>
            <span title="Issues abertas">
              <i className="bi bi-exclamation-circle me-1 text-secondary"></i>
              {repo.open_issues_count} issues
            </span>
            {repo.license && (
              <span title="Licença">
                <i className="bi bi-balance-scale me-1 text-secondary"></i>
                {repo.license.spdx_id}
              </span>
            )}
          </div>

          <div className="row g-3 mb-4">
            {repo.language && (
              <div className="col-sm-6 col-md-4">
                <div className="p-3 bg-light rounded">
                  <small className="text-muted d-block mb-1">Linguagem principal</small>
                  <span className="d-flex align-items-center gap-2">
                    <span
                      className="lang-dot"
                      style={{ background: languageColors[repo.language] || '#8b949e' }}
                    />
                    <strong>{repo.language}</strong>
                  </span>
                </div>
              </div>
            )}
            <div className="col-sm-6 col-md-4">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Branch padrão</small>
                <span>
                  <i className="bi bi-git me-1 text-secondary"></i>
                  <strong>{repo.default_branch}</strong>
                </span>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="p-3 bg-light rounded">
                <small className="text-muted d-block mb-1">Atualizado em</small>
                <strong>{new Date(repo.updated_at).toLocaleDateString('pt-BR')}</strong>
              </div>
            </div>
          </div>

          {Object.keys(languages).length > 0 && (
            <div>
              <h6 className="mb-2">Linguagens</h6>
              <div className="progress mb-2" style={{ height: 8 }}>
                {Object.entries(languages).map(([language, bytes]) => (
                  <div
                    key={language}
                    className="progress-bar"
                    style={{
                      width: `${(bytes / totalBytes) * 100}%`,
                      background: languageColors[language] || '#8b949e',
                    }}
                    title={`${language}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
                  />
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                {Object.entries(languages).map(([language, bytes]) => (
                  <span key={language} className="d-flex align-items-center gap-1 small">
                    <span
                      className="lang-dot"
                      style={{ background: languageColors[language] || '#8b949e', width: 10, height: 10 }}
                    />
                    {language}
                    <span className="text-muted">
                      {((bytes / totalBytes) * 100).toFixed(1)}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {repo.topics?.length > 0 && (
            <div className="mt-3">
              {repo.topics.map((topic) => (
                <span key={topic} className="badge bg-primary-subtle text-primary me-1 mb-1">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
