import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    url:"https://shapp-app-api.herokuapp.com",
    evenemts:{},
    operateurs:null
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})