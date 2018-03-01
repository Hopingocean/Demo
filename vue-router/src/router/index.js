import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page1 from '@/components/Page1'
import Page2 from '@/components/Page2'
import Page3 from '@/components/Page3'
import Page01 from '@/components/Page01'
import Page02 from '@/components/Page02'
import NotFound from '@/components/NotFound'

Vue.use(Router)

// 注意：以/开头的嵌套路径会被当做根路径
export default new Router({
  // mode
  mode: 'history', // hash/history/abstract
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // 多组件
      components: {
        default: HelloWorld,
        left: Page1,
        right: Page2
      }
    },
    {
      path: '/page1',
      name: 'Page1',
      component: Page1,
      // 子路由
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
      component: Page2,
      alias: '/goPage2' // 路由别名
    },
    // 路由传参
    {
      path: '/page3/:userId/:userName', 
      name: 'Page3',
      component: Page3,
      // 钩子函数,路由独享的守卫
      // 可以在路由组件内直接定义以下路由导航守卫
      // beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave
      beforeEnter:(to, from, next) => {
        console.log(to)
        console.log(from)
        next() // 确保要调用next方法，否则钩子就不会被resolved
      }
    },
    // 重定向
    {
      path: '/goHome',
      redirect: '/'
    },
    {
      path: '/goPage3/:userId(\\d+)/:userName',
      redirect: '/page3/:userId/:userName'
    },
    // 404
    {
      path: '*',
      component: NotFound
    },
  ]
})
