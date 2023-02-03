import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    url:"https://shapp.weka-pesa.com",
    evenemts:{},
    operateurs:null,
    refreshing_token: false
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})