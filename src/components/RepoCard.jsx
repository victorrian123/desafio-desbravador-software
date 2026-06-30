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
}

function formatCount(number) {
  if (number >= 1000) return `${(number / 1000).toFixed(1)}k`
  return String(number)
}

export default function RepoCard({ repo }) {
  return (
    <div className="card h-100 shadow-sm repo-card border">
      <div className="card-body d-flex flex-column">
        <h6 className="card-title text-primary mb-1">
          <i className="bi bi-folder2 me-1"></i>
          {repo.name}
        </h6>
        {repo.description && (
          <p className="card-text text-muted small flex-grow-1 mb-2" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {repo.description}
          </p>
        )}
        {!repo.description && <div className="flex-grow-1" />}

        <div className="d-flex flex-wrap gap-2 mt-2 small text-muted">
          {repo.language && (
            <span className="d-flex align-items-center gap-1">
              <span
                className="lang-dot"
                style={{
                  background: languageColors[repo.language] || '#8b949e',
                  width: 10, height: 10,
                }}
              />
              {repo.language}
            </span>
          )}
          <span>
            <i className="bi bi-star me-1"></i>
            {formatCount(repo.stargazers_count)}
          </span>
          <span>
            <i className="bi bi-diagram-2 me-1"></i>
            {formatCount(repo.forks_count)}
          </span>
          {repo.fork && (
            <span className="badge bg-secondary-subtle text-secondary">fork</span>
          )}
        </div>
      </div>
    </div>
  )
}
