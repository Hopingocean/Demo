import Vue from 'vue'
import Router from 'vue-router'
import Gift from '@/components/game/Gift'
import News from '@/components/game/News'
import MoreGame from '@/components/game/MoreGame'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Gift',
            component: Gift
        }, {
            path: '/gift',
            name: 'Gift',
            component: Gift
        },
        {
            path: '/news',
            name: 'News',
            component: News
        },
        {
            path: '/moregame',
            name: 'MoreGame',
            component: MoreGame
        }
    ]
})