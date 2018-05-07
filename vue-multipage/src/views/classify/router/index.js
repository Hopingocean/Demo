import Vue from 'vue'
import Router from 'vue-router'

import Chess from '@/components/classify/ChessGame'
import Puzzle from '@/components/classify/PuzzleGame'
import Casual from '@/components/classify/CasualGame'
import Role from '@/components/classify/RoleGame'
import Action from '@/components/classify/ActionGame'
import Shooting from '@/components/classify/ShootingGame'

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
            path: '/chess',
            name: 'Chess',
            component: Chess
        },
        {
            path: '/puzzle',
            name: 'Puzzle',
            component: Puzzle
        },
        {
            path: '/casual',
            name: 'Casual',
            component: Casual
        },
        {
            path: '/role',
            name: 'Role',
            component: Role
        },
        {
            path: '/action',
            name: 'Action',
            component: Action
        },
        {
            path: '/shooting',
            name: 'Shooting',
            component: Shooting
        }
    ]
})