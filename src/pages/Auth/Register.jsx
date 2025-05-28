import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import './Register.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const togglePasswordVisibility = (field) => {
  if (field === 'password') {
    setShowPassword(!showPassword)
  } else {
    setShowConfirmPassword(!showConfirmPassword)
  }
}

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
      setError(err.response?.data || 'Erro ao cadastrar')
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

        <div className="form-group password-group">
          <label htmlFor="password">Senha</label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword ? '🙉' : '🙈'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme sua Senha</label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
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