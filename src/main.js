// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import Icon from 'vue-svg-icon/Icon'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)
Vue.prototype.$http = axios


Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
