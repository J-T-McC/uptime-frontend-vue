import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard.vue'
import Sites from '@/views/Sites.vue'
import Integrations from '@/views/Integrations.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: "empty" }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {sidebar: true}
  },
  {
    path: '/sites',
    name: 'Sites',
    component: Sites,
    meta: {sidebar: true}
  },
  {
    path: '/integrations',
    name: 'Integrations',
    component: Integrations,
    meta: {sidebar: true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
