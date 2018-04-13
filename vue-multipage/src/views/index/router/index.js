import Vue from 'vue'
import Router from 'vue-router'
import HotGame from '@/components/index/HotGame'
import NewGame from '@/components/index/NewGame'
import HotActivity from '@/components/index/HotActivity'
import OpenGame from '@/components/index/OpenGame'

import Activity from '@/components/activity/Activity'
import Prize from '@/components/activity/Prize'
import Notice from '@/components/activity/Notice'

import NewOpen from '@/components/open/NewOpen'
import SoonOpen from '@/components/open/SoonOpen'

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
            component: HotActivity,
            children: [{
                    path: 'activity',
                    name: 'Activity',
                    component: Activity
                },
                {
                    path: 'prize',
                    name: 'Prize',
                    component: Prize
                },
                {
                    path: 'notice',
                    name: 'Notice',
                    component: Notice
                },
            ]
        },
        {
            path: '/opengame',
            name: 'OpenGame',
            component: OpenGame,
            children: [{
                    path: 'newopen',
                    name: 'NewOpen',
                    component: NewOpen
                },
                {
                    path: 'soonopen',
                    name: 'SoonOpen',
                    component: SoonOpen
                }
            ]
        }
    ]
})