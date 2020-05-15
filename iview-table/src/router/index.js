import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('../components/Tab1.vue')
    },
    {
      path: '/tab1',
      name: 'tab1',
      component: () => import('../components/Tab1.vue')
    },
    {
      path: '/tab2',
      name: 'tab2',
      component: () => import('../components/Tab2.vue')
    }
  ]
});

export default router;