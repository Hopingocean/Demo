import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'
import Page3 from '@/components/Page3'
import Page01 from '@/components/Page01'
import Page02 from '@/components/Page02'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page1',
      name: 'Page1',
      component: Page1,
      children: [
        {
          path: '/',
          name: 'Page01', 
          component: Page01
        },
        {
          path: 'page01', 
          name: 'Page01', 
          component: Page01
        },
        {
          path: 'page02', 
          name: 'Page02', 
          component: Page02
        }
      ]
    },
    {
      path: '/page2',
      name: 'Page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'Page3',
      component: Page3
    }
  ]
})
