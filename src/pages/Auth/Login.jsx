import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api'
import './Login.css'
import Footer from '../../components/Footer'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const Navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      console.log(email, 'Email');
      console.log(password, 'SENHA');
      
      const { data } = await api.post('/auth/login', { email, password })
      console.log(data, 'data');
      localStorage.setItem('token', data.token)
      Navigate('/vacancies')
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciais inválidas')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}

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
              onClick={togglePasswordVisibility}
              >
              {showPassword ? '🙉' : '🙈'}
            </button>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
          
          <Link to="/forgot-password" className="forgot-password">
            Esqueci minha senha
          </Link>
        </div>

        <div className="register-redirect">
          <span>Não tem uma conta? </span>
          <Link to="/register" className="register-link">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
      <Footer />
              </>
  )
}