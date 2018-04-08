import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
// import tagsView from './modules/tagsView'
import user from './modules/user'
import pagination from './modules/pagination'
import dictionaries from './modules/dictionaries'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    dictionaries,
    // tagsView,
    user,
    pagination
  },
  getters
})

export default store
