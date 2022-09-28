import Vue from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Tickets from '../views/Tickets.vue'
import Password from '../views/Password.vue'
import Credit from '../views/Credit.vue'
import Event from '../views/Event.vue'
import Search from '../views/Search.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'home', component: Home},
  { path: '/login', name: 'login', component: Login},
  { path: '/password', name: 'password', component: Password},
  { path: '/profile', name: 'profile', component: Profile},
  { path: '/tickets/:nom', name: 'tickets', component: Tickets},
  { path: '/credit', name: 'credit', component: Credit},
  { path: '/event', name: 'event', component: Event},
  { path: '/search', name: 'search', component: Search},
  { path: '/about', name: 'about', component: About},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router