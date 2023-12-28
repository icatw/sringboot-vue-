import request from '@/utils/request.js'

// 注册
export function register (userinfo) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username: userinfo.username,
      password: userinfo.password
    }
  })
}

// 登录
export function login (userinfo) {
  return request({
    url: '/user/login?username=' + userinfo.username + '&password=' + userinfo.password,
    method: 'post'
    // data: {
    //   username:userinfo.uname,
    //   password:userinfo.pass
    // }
  })
}

export function sendCode (phoneNumber) {
  return request({
    url: '/sms/sendCode',
    method: 'get',
    params: {
      phoneNumber: phoneNumber
    }
  })
}

export function smsLogin (data) {
  return request({
    url: '/login/sms?phoneNumber=' + data.phoneNumber + '&phoneCode=' +data.phoneCode,
    method: 'post',
  })
}

// 获取用户信息
export function getMy () {
  return request({
    url: '/user-info/getMy',
    method: 'get'
  })
}

// 更新用户
export function updateUser (data) {
  return request({
    url: '/user-info/update/info',
    method: 'post',
    data
  })
}

// 更改用户密码
export function updatePass (data) {
  return request({
    url: '/user-auth/update/password',
    method: 'post',
    data
  })
}

// 更改用户头像
export function updateAvatar (urls) {
  return request({
    url: '/user-info/update/avatar',
    method: 'post',
    data: { imageUrl: urls }
  })
}
export function socialLogin (source) {
  return request({
    url: `/oauth/render/${source}`,
    method: 'get',
  })
}
