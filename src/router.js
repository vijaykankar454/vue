import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config.js'

import HomePage from './components/home/Home.vue'
import InformationDeskPage from './components/desk/informationdesk.vue'
import ExhibitorPage from './components/exhibitor/exhibitor.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import StallPage from './components/dashboard/stall.vue'
import StallsPage from './components/dashboard/stalls.vue'
Vue.use(VueRouter)

const routes = [
  
  { path: '/informationdesk', component: InformationDeskPage },
  { path: '/exhibitor', component: ExhibitorPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('virtual_email') == '') {
        next(localStorage.getItem('virtual_key'))
      }
      else if (localStorage.getItem('virtual_token')) {
        next()
      } else {
        if (localStorage.getItem('virtual_key')) {
          next(localStorage.getItem('virtual_key'))
        } else {
          location.href = config.DEFAULT_URL.HOST_URL;
        }
      }
    }
  },
  {
    path: '/stall/:id',
    name: 'stalldetail',
    component: StallPage,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('virtual_email') == '') {
        next(localStorage.getItem('virtual_key'))
      }
      else if (localStorage.getItem('virtual_token')) {
        next()
      } else {
        if (localStorage.getItem('virtual_key')) {
          next(localStorage.getItem('virtual_key'))
        } else {
          location.href = config.DEFAULT_URL.HOST_URL;
        }
      }
    }
  },
  {
    path: '/stalls/:id?',
    name: 'stallcomdetail',
    component: StallsPage,
    beforeEnter(to, from, next) {
      if (localStorage.getItem('vvirtual_email') == '') {
        next(localStorage.getItem('virtual_key'))
      }
      else  if (localStorage.getItem('virtual_token')) {
        next()
      } else {
        if (localStorage.getItem('virtual_key')) {
          next(localStorage.getItem('virtual_key'))
        } else {
          location.href = config.DEFAULT_URL.HOST_URL;
        }
      }
    }
  },
  { path: '/:keyname', component: HomePage },
  //{ path: '*', redirect: '/bhopal' }
 
]

export default new VueRouter({mode: 'hash',base: "virtual-expo", routes})