import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Recuperar Senha</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Página em construção. Volte em breve!
        </p>
        <Link to="/login" className="login-button">
          Voltar para Login
        </Link>
      </div>
    </div>
  )
}