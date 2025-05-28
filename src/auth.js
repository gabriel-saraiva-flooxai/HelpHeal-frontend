import jwtDecode from 'jwt-decode'

export function getUserRole() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const { role } = jwtDecode(token)
    return role
  } catch {
    return null
  }
}