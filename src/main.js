// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router.js" 
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/index'
import common from './util/common'
Vue.use(Vuex)
 // 处理URLSearchParams的兼容性
import 'url-search-params-polyfill'    
// 时间处理过滤器
import moment from 'moment'
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

Vue.use(VueAxios,axios);
Vue.config.productionTip = false

Vue.prototype.$common = common


new Vue({
  el: '#app',
  components: { App },
  store,
  router,
  template: '<App/>'
})
