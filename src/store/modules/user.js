import { loginByUsername } from '@/api/login'
import { login, logout, getUserInfo } from '@/api/loginAPI'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'
import md5 from 'blueimp-md5'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    // userId: getUserId(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    transitionRoles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TRANSITIONROLES: (state, roles) => {
      state.transitionRoles = roles
    }
  },

  actions: {
    // 用户名登录
    async LoginByUsername({ commit }, userInfo) {
      try {
        userInfo.name = userInfo.name.trim()
        const data = (await login({ data: userInfo })).data
        const user = data.user
        commit('SET_TOKEN', 'Bearer_' + user.token)
        setToken('Bearer_' + user.token)
        // commit('SET_USERID', user.id)
        // setUserId(user.id)
        commit('SET_NAME', user.name)
      } catch (error) {
        console.log(error, 'LoginByUsername')
        throw Error(error)
      }

      // return new Promise((resolve, reject) => {
      //   commit('SET_TOKEN', 'admin')
      //   setToken('admin')
      //   resolve()
      // loginByUsername(username, userInfo.password).then(response => {
      //   const data = response.data
      //   commit('SET_TOKEN', data.token)
      //   setToken(response.data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      // })
    },

    // 获取用户信息
    async GetUserInfo({ commit, state }) {
      // 登录
      if (!getToken()) {
        try {
          const data = (await login({
            data: {
              name: 'zhang',
              password: md5(123456)
            }
          })).data
          const user = data.user
          commit('SET_TOKEN', 'Bearer_' + user.token)
          setToken('Bearer_' + user.token)
          commit('SET_USERID', user.id)
          setUserId(user.id)
          commit('SET_NAME', user.name)
        } catch (error) {
          console.log(error, 'LoginByUsername')
          throw Error(error)
        }
      }
      try {
        const data = (await getUserInfo({ data: { token: getToken() }})).data
        console.log(data.user.userRoleVOList[0].roleVO.name)
        const response = {
          data: {
            role: state.roles
          }
        }
        commit('SET_ROLES', [data.user.userRoleVOList[0].roleVO.name])
        commit('SET_NAME', data.user.name)
        return response
      } catch (error) {
        throw Error(error)
      }

      // return new Promise((resolve, reject) => {
      //   const response = {}
      //   const data = {
      //     role: ['admin'],
      //     token: 'admin',
      //     introduction: '我是超级管理员',
      //     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      //     name: 'Super Admin'
      //   }
      //   commit('SET_ROLES', data.role)
      //   commit('SET_NAME', data.name)
      //   commit('SET_AVATAR', data.avatar)
      //   commit('SET_INTRODUCTION', data.introduction)
      //   response.data = data
      //   resolve(response)
      //   getUserInfo(state.token).then(response => {
      //     if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
      //       reject('error')
      //     }
      //     const data = response.data
      //     commit('SET_ROLES', data.role)
      //     commit('SET_NAME', data.name)
      //     commit('SET_AVATAR', data.avatar)
      //     commit('SET_INTRODUCTION', data.introduction)
      //     resolve(response)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    async LogOut({ commit, state }) {
      try {
        (await logout()).data
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
      } catch (error) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        console.log(error, 'LoginByUsername')
        throw Error(error)
      }
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    },

    // 前端 登出
    async FedLogOut({ commit }) {
      try {
        (await logout()).data
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
      } catch (error) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        console.log(error, 'LoginByUsername')
        throw Error(error)
      }
      // return new Promise(resolve => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resolve()
      // })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
