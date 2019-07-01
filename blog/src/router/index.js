/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

const NotFound = () => import('../components/NotFound')
const Home = () => import('../components/frontEnd/Home')
const About = () => import('../components/frontEnd/About')
const Article = () => import('../components/frontEnd/Article')
const Header = () => import('../components/frontEnd/Header')
const Tags = () => import('../components/frontEnd/Tags')
const Category = () => import('../components/frontEnd/Category')

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
