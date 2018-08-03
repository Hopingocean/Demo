import Vue from 'vue'
import Router from 'vue-router'

import ClassifyGame from '@/components/classify/ClassifyGame'

import Search from '@/components/classify/Search'
import HotSearch from '@/components/classify/HotSearch'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'HotSearch',
            component: HotSearch
        },
        {
            path: '/search/:searchText',
            name: 'Search',
            component: Search,
        },
        {
            path: '/:typeId',
            name: 'ClassifyGame',
            component: ClassifyGame
        }
    ]
})