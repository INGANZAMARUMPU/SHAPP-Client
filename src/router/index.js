import Vue from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  { path: '/', name: 'home', component: Home},
  { path: '/login', name: 'login', component: Login},
  { path: '/profile', name: 'profile', component: Profile},
  { path: '/tickets/:nom', name: 'tickets', component: Tickets},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router