import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import './Header.css'

function Header({ currentPage, onNavigate, onRequireLogin }) {
  const { count: cartCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()

  const tabs = [
    { id: 'list', label: 'Shop' },
    { id: 'cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
    { id: 'checkout', label: 'Checkout' },
  ]

  function handleLogout() {
    logout()
    onNavigate('list')
  }

  return (
    <header className="header">
      <div className="header__inner">
        <button
          className="header__logo"
          onClick={() => onNavigate('list')}
          aria-label="Kal's home"
        >
          Kal's
        </button>

        <nav className="header__nav" aria-label="Main">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={
                'header__tab' +
                (currentPage === tab.id ? ' header__tab--active' : '')
              }
              onClick={() => onNavigate(tab.id)}
              aria-current={currentPage === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="header__account">
          {isAuthenticated ? (
            <>
              <span className="header__greeting">Hi, {user.name}</span>
              <button className="header__account-btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <button
              className="header__account-btn"
              onClick={onRequireLogin}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
