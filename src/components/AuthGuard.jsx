import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AuthGuard({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && (!user || !allowedRoles.includes(user.role))) {
      navigate('/login')
    }
  }, [user, loading, allowedRoles, navigate])

  if (loading) return <div>Carregando...</div>
  if (user && allowedRoles.includes(user.role)) return children
  return null
}