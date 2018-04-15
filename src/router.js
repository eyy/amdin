import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import list from './views/list'
import create from './views/create'
import edit from './views/edit'
import single from './views/single'

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
      path: '/:model/new',
      name: 'create',
      component: create
    },
    {
      path: '/:model/single',
      name: 'single',
      component: single
    },
    {
      path: '/:model/:id',
      name: 'edit',
      component: edit
    }
  ]
})
