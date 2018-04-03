import Vue from 'vue'
import Toasted from 'vue-toasted'
import translate from './translate'
import router from './router'
import app from './views/app'
import obj from './fields/obj'

Vue.component('obj', obj)

Vue.use(translate)

Vue.use(Toasted, {
  singleton: true,
  duration: 5000,
  position: 'bottom-center',
  className: 'toasted-amdin',
  action: {
    text: '×',
    onClick (e, toastObject) {
      toastObject.goAway(0)
    }
  }
})
router.afterEach((to, from) => {
  if (from.name !== 'create' || to.name !== 'edit')
    Vue.toasted.clear()
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(app)
}).$mount('#app')
