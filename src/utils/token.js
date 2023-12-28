export function getToken() {
  return localStorage.token
}

export function setToken(token) {
  return localStorage.token = token
}
//销毁token
export function removeToken() {
  return localStorage.removeItem('token')
}