import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../components/Blog/Blog'
import Projects from '../components/Projects/Blog'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/work',
    name: 'feed',
    component: Projects
  }, {
    path: '/tech/:author',
    name: 'author',
    props: true,
    component: Projects
  }, {
    path: '/project/:post',
    name: 'post',
    props: true,
    component: Projects
  },{
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
