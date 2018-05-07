import Vue from 'vue'
import Router from 'vue-router'

import Search from '@/components/gift/SearchList'
import Gift from '@/components/gift/GiftList'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Gift',
            component: Gift
        },
        {
            path: '/search/:searchText',
            name: 'Search',
            component: Search,
        },
    ]
})