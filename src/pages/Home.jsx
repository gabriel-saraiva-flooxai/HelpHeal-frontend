import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import './Home.css'
import Navbar from '../components/Navbar'
import { getUserName, isLoggedIn } from '../auth'
import Footer from '../components/Footer'
import HomeText from '../components/HomeText'

export default function Home() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const token = localStorage.getItem('token')
    let user = null
    try { user = token && jwtDecode(token) } catch { }
    const isLogged = !!user

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email)
        }
    }, [location.state])
    
    console.log(getUserName());
    
    
    if (isLoggedIn()) {
    return (
        <>
            <Navbar />
            <div className="home-hero">
                <div className="home-hero-content">
                    <h1>Salve Vidas! Seja voluntário</h1>
                    <HomeText />
                </div>
            </div>
            <Footer />
        </>
    )
}
    
    // Versão para usuários não logados
    return (
        <>
            <Navbar />
            <div className='home-hero'>
                <div className="home-hero-content">
                    <h2>Salve Vidas! Seja voluntário</h2>
                    <form onSubmit={e => {
                        e.preventDefault()
                        navigate('/register', { state: { email } })
                    }}>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Seu melhor e-mail"
                            required
                        />
                        <button type="submit">Comece agora</button>
                    </form>
                    <Link to="/vacancies" className="home-hero-link">Ver vagas</Link>
                    <HomeText />
                </div>
            </div>
            <Footer />
        </>
    )
}
