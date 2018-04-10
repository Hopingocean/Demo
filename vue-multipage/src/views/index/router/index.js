import Vue from 'vue'
import Router from 'vue-router'
import HotGame from '@/components/index/HotGame'
import NewGame from '@/components/index/NewGame'
import HotActivity from '@/components/index/HotActivity'
import OpenGame from '@/components/index/OpenGame'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HotGame',
            component: HotGame
        },
        {
            path: '/hotgame',
            name: 'HotGame',
            component: HotGame
        },
        {
            path: '/newgame',
            name: 'NewGame',
            component: NewGame
        },
        {
            path: '/hotactivity',
            name: 'HotActivity',
            component: HotActivity
        },
        {
            path: '/opengame',
            name: 'OpenGame',
            component: OpenGame
        }
    ]
})