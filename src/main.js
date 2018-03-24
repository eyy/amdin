import Vue from 'vue'
import router from './router'
import app from './views/app'
import obj from './fields/obj'

Vue.component('obj', obj)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(app)
}).$mount('#app')
