import { useDispatch, useSelector } from 'react-redux'
import {
  login,
  register,
  logout,
  clearAuthError,
} from '../store/slices/authSlice.js'

export function useAuth() {
  const dispatch = useDispatch()
  const { user, isAuthenticated, error } = useSelector((state) => state.auth)

  return {
    user,
    isAuthenticated,
    error,
    login: (credentials) => dispatch(login(credentials)),
    register: (info) => dispatch(register(info)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearAuthError()),
  }
}
