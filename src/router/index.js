import Vue from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', name: 'home', component: Home},
  { path: '/profile', name: 'profile', component: Profile},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router