import Vue from 'vue'
import Router from 'vue-router'
import Order from '@/components/Order'
import Message from '@/components/Message'

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
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/message',
      component: Message
    }
  ]
})
