import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
      <i className="bi bi-emoji-dizzy display-1 text-secondary mb-3"></i>
      <h2>Página não encontrada</h2>
      <p className="text-muted mb-4">O endereço que você acessou não existe.</p>
      <Link to="/" className="btn btn-primary">
        <i className="bi bi-house me-1"></i>
        Voltar ao início
      </Link>
    </div>
  )
}
