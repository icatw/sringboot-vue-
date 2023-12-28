export function getUserInfo () {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo)
  } else {
    return null
  }
}

export function setUserInfo (userInfo) {
  localStorage.userInfo = JSON.stringify(userInfo)
}

export function removeUserInfo () {
  return localStorage.removeItem('userInfo')
}
