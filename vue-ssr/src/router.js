/**
 * Router
 */

 import Vue from 'vue'
 import Router from 'vue-router'

 const Foo = () => import('./components/Foo.vue')
 const Bar = () => import('./components/Bar.vue')

 Vue.use(Router)

 export function createRouter() {
     return new Router({
         mode: 'history',
         routes: [
            //  routes
            {
                path: '/',
                component: Foo
            },
            {
                path: '/foo/:id',
                component: Foo
            },
            {
                path: '/bar',
                component: Bar
            }
         ]
     })
 }