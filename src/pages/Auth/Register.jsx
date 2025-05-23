import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import './Register.css' // Usaremos o mesmo estilo do Login com pequenas adaptações

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await api.post('/auth/register', { name, email, password })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="login-container">
        <div className="login-form success-message">
          <h2>Cadastro concluído!</h2>
          <p>Seu cadastro foi realizado com sucesso.</p>
          <Link to="/login" className="login-button">
            Ir para Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Criar Conta</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme sua Senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div className="form-footer">
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </div>

        <div className="register-redirect">
          <span>Já tem uma conta? </span>
          <Link to="/login" className="register-link">
            Faça login
          </Link>
        </div>
      </form>
    </div>
  )
}