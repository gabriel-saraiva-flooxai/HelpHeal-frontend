import jwtDecode from 'jwt-decode'

export function getToken() {
  return localStorage.getItem('token')
}

export function getUserData() {
  const token = getToken()
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch (e) {
    return null
  }
}

export function getUserName() {
  try {
    const token = localStorage.getItem('token')
    console.log(jwtDecode(token))
    if (!token) return null
    const { name } = jwtDecode(token)
    return name || null
  } catch {
    return null
  }
}

export function getUserRole() {
  const user = getUserData()
  return user?.role || null
}

export function isLoggedIn() {
  return !!getUserData()
}

export function logout() {
  localStorage.removeItem('token')
}
