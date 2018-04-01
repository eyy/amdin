import Vue from 'vue'
import Toasted from 'vue-toasted'
import translate from './translate'
import router from './router'
import app from './views/app'
import obj from './fields/obj'
import he from './loc/he'

Vue.component('obj', obj)

Vue.use(translate, {
  dict: he
})

Vue.use(Toasted, {
  singleton: true,
  duration: 8000,
  position: 'bottom-center',
  className: 'toasted-amdin',
  action: {
    text: '×',
    onClick (e, toastObject) {
      toastObject.goAway()
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
