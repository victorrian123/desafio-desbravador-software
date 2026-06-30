export default function UserCard({ user }) {
  return (
    <div className="card shadow-sm sticky-top" style={{ top: 16 }}>
      <div className="card-body text-center p-4">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="avatar-lg rounded-circle mb-3 border"
        />
        <h5 className="mb-0">{user.name || user.login}</h5>
        <p className="text-muted small mb-2">@{user.login}</p>

        {user.bio && <p className="small text-muted mb-3">{user.bio}</p>}

        <div className="d-flex justify-content-center gap-3 mb-3">
          <div className="text-center">
            <div className="fw-bold">{user.followers.toLocaleString('pt-BR')}</div>
            <small className="text-muted">Seguidores</small>
          </div>
          <div className="text-center">
            <div className="fw-bold">{user.following.toLocaleString('pt-BR')}</div>
            <small className="text-muted">Seguindo</small>
          </div>
          <div className="text-center">
            <div className="fw-bold">{user.public_repos.toLocaleString('pt-BR')}</div>
            <small className="text-muted">Repos</small>
          </div>
        </div>

        <hr />

        <ul className="list-unstyled text-start small">
          {user.company && (
            <li className="mb-1">
              <i className="bi bi-building me-2 text-secondary"></i>
              {user.company}
            </li>
          )}
          {user.location && (
            <li className="mb-1">
              <i className="bi bi-geo-alt me-2 text-secondary"></i>
              {user.location}
            </li>
          )}
          {user.email && (
            <li className="mb-1">
              <i className="bi bi-envelope me-2 text-secondary"></i>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
          )}
          {user.blog && (
            <li className="mb-1">
              <i className="bi bi-link-45deg me-2 text-secondary"></i>
              <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-truncate d-inline-block" style={{ maxWidth: 160 }}>
                {user.blog.replace(/^https?:\/\//, '')}
              </a>
            </li>
          )}
          {user.twitter_username && (
            <li className="mb-1">
              <i className="bi bi-twitter-x me-2 text-secondary"></i>
              @{user.twitter_username}
            </li>
          )}
        </ul>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-dark btn-sm w-100"
        >
          <i className="bi bi-github me-1"></i>
          Ver perfil
        </a>
      </div>
    </div>
  )
}
