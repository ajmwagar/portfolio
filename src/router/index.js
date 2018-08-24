import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components/Blog'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/blog',
    name: 'feed',
    component: Blog
  }, {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Blog
  }, {
    path: '/read/:post',
    name: 'post',
    props: true,
    component: Blog
  }, {
    path: '/',
    name: 'about',
    props: true,
    component: About
  }]
})
