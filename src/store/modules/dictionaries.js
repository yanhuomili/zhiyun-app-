import { getAllPort } from '@/api/shippingMaintainAPI'
// import { getAllArea, getAllCountry } from '@/api/areaAPI'
const dictionaries = {
  state: {
    port: {
      isLoaded: false,
      value: []
    },
    allArea: [],
    country: []
  },
  mutations: {
    SET_PORT: (state, port) => {
      state.port.isLoaded = true
      state.port.value = port
    },
    SET_ALL_AREA: (state, allArea) => {
      state.allArea = allArea
    },
    SET_COUNTRY: (state, country) => {
      state.country = country
    }
  },
  actions: {
    async getPortACT({ commit, state }) {
      if (state.port.isLoaded) {
        return state.port.value
      }
      // try {
      //   const data = (await getAllPort()).data
      //   commit('SET_PORT', data.data)
      // } catch (err) {
      //   throw Error(err)
      // }
      //   return new Promise((resolve, reject) => {
      //     getAllPort().then(response => {
      //       const data = response.data
      //       commit('SET_PORT', data)
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
    }
  }
}

export default dictionaries
