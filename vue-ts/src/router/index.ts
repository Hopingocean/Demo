import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'Home',
        path: '/home',
        component: () => import('@/pages/home/index.vue')
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;