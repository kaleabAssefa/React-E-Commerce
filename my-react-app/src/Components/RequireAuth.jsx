import './RequireAuth.css'

// Condition-based rendering of a protected section: show the real
// content only if the user is logged in, otherwise show a prompt
// instead of the page it's guarding.
function RequireAuth({ isAuthenticated, onGoToLogin, children }) {
  if (isAuthenticated) {
    return children
  }

  return (
    <section className="require-auth">
      <h1>Log in to check out</h1>
      <p>Create a free account or log in to complete your order.</p>
      <button className="btn btn--primary" onClick={onGoToLogin}>
        Log in / Sign up
      </button>
    </section>
  )
}

export default RequireAuth
