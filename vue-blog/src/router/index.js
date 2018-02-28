/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '../components/NotFound'
import Home from '../components/frontEnd/Home'
import About from '../components/frontEnd/About'
import Article from '../components/frontEnd/Article'
import Header from '../components/frontEnd/Header'
import Tags from '../components/frontEnd/Tags'
import Category from '../components/frontEnd/Category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/notFound',
      component: NotFound,
      name: 'NotFound',
      hidden: true
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      component: About,
      name: 'About'
    },
    {
      path: '/article',
      component: Article,
      name: 'article',
    },
    {
      path: '/tags',
      component: Tags,
      name: 'Tags'
    },
    {
      path: '/category',
      component: Category,
      name: 'Category'
    }
  ]
})
