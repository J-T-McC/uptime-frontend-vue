import { createRouter, createWebHistory } from 'vue-router'

import AuthRoutes from '@/router/auth'
import DashboardRoutes from '@/router/dashboard'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...AuthRoutes,
  ...DashboardRoutes,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
