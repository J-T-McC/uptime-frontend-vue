import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard.vue'
import Monitors from '@/views/Monitors.vue'
import Integrations from '@/views/Integrations.vue'
import CreateMonitor from '@/views/CreateMonitor'
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
    path: '/monitors',
    name: 'Monitors',
    component: Monitors,
    meta: {sidebar: true}
  },
  {
    path: '/monitors/create',
    name: 'Create Monitor',
    component: CreateMonitor,
    meta: {sidebar: false}
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
