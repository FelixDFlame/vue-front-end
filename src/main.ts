import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
