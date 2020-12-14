import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/layout/views/Login'
import Dashboard from '@/components/layout/views/Dashboard.vue'
import Monitors from '@/components/layout/views/Monitors.vue'
import Integrations from '@/components/layout/views/Channels.vue'

import { Home } from 'heroicons/vue/outline'
import { SearchCircle } from 'heroicons/vue/outline'
import { Bell } from 'heroicons/vue/outline'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: "empty"}
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {sidebar: true, icon: Home }
  },
  {
    path: '/monitors',
    name: 'Monitors',
    component: Monitors,
    meta: {sidebar: true, icon: SearchCircle }
  },
  {
    path: '/integrations',
    name: 'Integrations',
    component: Integrations,
    meta: {sidebar: true, icon: Bell }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
