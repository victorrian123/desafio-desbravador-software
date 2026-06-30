import { Link } from 'react-router-dom'

export default function ErrorAlert({ message }) {
  return (
    <div className="container py-5 text-center">
      <i className="bi bi-exclamation-triangle display-4 text-danger mb-3 d-block"></i>
      <p className="text-danger fs-5 mb-3">{message}</p>
      <Link to="/" className="btn btn-outline-secondary">
        <i className="bi bi-arrow-left me-1"></i>
        Voltar ao início
      </Link>
    </div>
  )
}
