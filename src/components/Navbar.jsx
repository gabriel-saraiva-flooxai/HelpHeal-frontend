import './Navbar.css'
import { Link } from 'react-router-dom'
import { getUserName, isLoggedIn, logout } from '../auth'
import logo from '../imgs/logoHH.png'

export default function Navbar() {
  const name = getUserName()
  const isLogged = isLoggedIn()

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="HelpHeal Logo" className="navbar-logo" />
        </Link>
      </div>
      <nav className="navbar-menu">
        {isLogged ? (
          <>
            <span className="navbar-user">Olá, {name || 'Usuário!'}</span>
            <Link to="/vacancies" className="navbar-btn">Procure uma vaga</Link>
            <button onClick={() => { logout(); window.location.replace('/') }} className="navbar-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn">Entrar</Link>
            <Link to="/register" className="navbar-btn">Criar conta</Link>
          </>
        )}
      </nav>
    </header>
  )
}
