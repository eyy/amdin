import Vue from 'vue'
import router from './router'
import app from './views/app'
import obj from './fields/obj'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 8000,
  className: 'toasted-amdin',
  singleton: true,
  action: {
    text: '×',
    onClick (e, toastObject) {
      toastObject.goAway(0)
    }
  }
})
Vue.component('obj', obj)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(app)
}).$mount('#app')
