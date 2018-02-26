import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/components/Order'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Order',
      component: Order
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    }
  ]
})
