import { createSlice } from '@reduxjs/toolkit'

// This is a demo-only "backend": registered users live in memory, in the
// Redux store, instead of a real database. Good enough to demonstrate
// the login/register flow and to gate the checkout page.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [], // { name, email, password }
    user: null, // { name, email } of the signed-in user
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    register: (state, action) => {
      const { name, email, password } = action.payload
      const alreadyExists = state.users.some((u) => u.email === email)

      if (alreadyExists) {
        state.error = 'An account with that email already exists.'
        return
      }

      state.users.push({ name, email, password })
      state.user = { name, email }
      state.isAuthenticated = true
      state.error = null
    },
    login: (state, action) => {
      const { email, password } = action.payload
      const match = state.users.find(
        (u) => u.email === email && u.password === password,
      )

      if (!match) {
        state.error = 'Incorrect email or password.'
        return
      }

      state.user = { name: match.name, email: match.email }
      state.isAuthenticated = true
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    clearAuthError: (state) => {
      state.error = null
    },
  },
})

export const { register, login, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
