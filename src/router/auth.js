import Login from '@/components/layout/views/auth/Login'
import Register from '@/components/layout/views/auth/Register'
import ForgotPassword from '@/components/layout/views/auth/ForgotPassword'
import ResetPassword from '@/components/layout/views/auth/ResetPassword'

const AuthRoutes = [
  {
    path: '/login/:id?/:hash?',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty', auth: true },
    alias: [
      '/email/verify/:id?/:hash?',
      '/api/email/verify/:id?/:hash?'
    ],
  },
    {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'empty', auth: true }
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: { layout: 'empty', auth: true }
  },
  {
    path: '/password/reset/:token',
    name: 'Reset Password',
    component: ResetPassword,
    meta: { layout: 'empty', auth: true }
  }
]

export default AuthRoutes