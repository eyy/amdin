import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import list from './views/list'
import edit from './views/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/:model',
      name: 'list',
      component: list
    },
    {
      path: '/:model/:id',
      name: 'edit',
      component: edit
    }
  ]
})
