import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import './Auth.css'

const initialLoginForm = { email: '', password: '' }
const initialRegisterForm = { name: '', email: '', password: '' }

function Auth({ onSuccess }) {
  const { login, register, error, isAuthenticated, clearError } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [registerForm, setRegisterForm] = useState(initialRegisterForm)

  function switchMode(nextMode) {
    setMode(nextMode)
    clearError()
  }

  function handleLoginChange(e) {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleRegisterChange(e) {
    const { name, value } = e.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleLoginSubmit(e) {
    e.preventDefault()
    login(loginForm)
  }

  function handleRegisterSubmit(e) {
    e.preventDefault()
    register(registerForm)
  }

  // The parent decides where to go once auth succeeds (back to shop,
  // or on to the checkout page the user was trying to reach).
  if (isAuthenticated) {
    onSuccess?.()
    return null
  }

  return (
    <section className="auth">
      <div className="auth__card">
        <div className="auth__tabs">
          <button
            className={
              'auth__tab' + (mode === 'login' ? ' auth__tab--active' : '')
            }
            onClick={() => switchMode('login')}
          >
            Log in
          </button>
          <button
            className={
              'auth__tab' + (mode === 'register' ? ' auth__tab--active' : '')
            }
            onClick={() => switchMode('register')}
          >
            Create account
          </button>
        </div>

        {error && <p className="auth__error">{error}</p>}

        {mode === 'login' ? (
          <form className="auth__form" onSubmit={handleLoginSubmit}>
            <label className="auth__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </label>

            <label className="auth__field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </label>

            <button type="submit" className="btn btn--primary">
              Log in
            </button>
          </form>
        ) : (
          <form className="auth__form" onSubmit={handleRegisterSubmit}>
            <label className="auth__field">
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label className="auth__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <label className="auth__field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
            </label>

            <button type="submit" className="btn btn--primary">
              Create account
            </button>
          </form>
        )}

        <p className="auth__note">
          Demo-only: accounts are stored in memory and reset on refresh.
        </p>
      </div>
    </section>
  )
}

export default Auth
