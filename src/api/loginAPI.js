import request from '@/utils/request'

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }

// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// 注册
export function register(query) {
  return request({
    url: '/orguser/register',
    method: 'post',
    ...query
  })
}

// 登录
export function login(query) {
  return request({
    url: '/orguser/login',
    method: 'post',
    ...query
  })
}

// 退出
export function logout(query) {
  return request({
    url: '/orguser/logout',
    method: 'post',
    ...query
  })
}

export function getUserInfo(query) {
  return request({
    url: '/orguser/getloginuserinfo',
    method: 'post',
    ...query
  })
}

export function test(token) {
  return request({
    url: '/test/list',
    method: 'get',
    params: { token }
  })
}
