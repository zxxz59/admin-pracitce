import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import '@/permission'
import '@/utils/dayjs'

import * as adminComponent from '@/components'
Object.keys(adminComponent).forEach((key) => {
  Vue.component(key, adminComponent[key])
})

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
