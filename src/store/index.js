import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import shopCar from './modules/shopCar'
import sort from './modules/sort'
import order from './modules/order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    shopCar,
    sort,
    order
  },
})