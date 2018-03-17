import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Presentation from '@/components/Presentation'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/about',
      name: 'Presentation',
      component: Presentation
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
