import ApiService from '@/services/ApiService'

export default function AuthService() {

  const checkIfAuthenticated = async () => {
    return ApiService.get('/api/authenticated')
  }

  const fetchCsrf = () => {
    return ApiService.get('/sanctum/csrf-cookie')
  }

  const login = async (data) => {
    return ApiService.post('/login', data)
  }

  const register = async (data) => {
    return ApiService.post('/register', data)
  }

  const verifyEmail = async (id, hash, params) => {
    return ApiService.get(`/email/verify/${id}/${hash}`, {
      params
    })
  }

  const forgotPassword = async (data) => {
    return ApiService.post('/forgot-password', data)
  }

  const resetPassword = async (data) => {
    return ApiService.post('/reset-password', data)
  }

  const updatePassword = async (data) => {
    return ApiService.put('/user/password', data)
  }

  const updateProfile = async (data) => {
    return ApiService.put('/user/profile-information', data)
  }

  const logout = async () => {
    return ApiService.post('/logout')
  }

  const resendVerificationEmail = async () => {
    return ApiService.post('/email/verification-notification')
  }

  return {
    fetchCsrf,
    login,
    logout,
    register,
    verifyEmail,
    updateProfile,
    resetPassword,
    forgotPassword,
    updatePassword,
    checkIfAuthenticated,
    resendVerificationEmail,
  }
}