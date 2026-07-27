import { useState } from 'react'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import Auth from './Components/Auth.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import { useFetchProducts } from './hooks/useFetchProduct.js'
import { useAuth } from './hooks/useAuth.js'
import './App.css'

function App() {
  // Page switching is the one piece of state that stays local to App —
  // it's pure UI navigation, not data the rest of the app needs to share.
  // Products, cart, and auth all live in Redux instead (see src/store).
  const [currentPage, setCurrentPage] = useState('list')
  const [selectedProductId, setSelectedProductId] = useState(null)
  // Where to send the user after a successful login — 'list' unless they
  // were bounced here from the protected checkout page.
  const [postLoginPage, setPostLoginPage] = useState('list')

  const { products, status } = useFetchProducts()
  const { isAuthenticated } = useAuth()

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || null

  function handleSelectProduct(productId) {
    setSelectedProductId(productId)
    setCurrentPage('detail')
  }

  function handleNavigate(page) {
    setCurrentPage(page)
  }

  function handleGoToLogin(redirectTo) {
    setPostLoginPage(redirectTo || 'list')
    setCurrentPage('login')
  }

  return (
    <div className="app">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequireLogin={() => handleGoToLogin('list')}
      />

      <main className="app__main">
        {currentPage === 'list' && (
          <ProductList
            products={products}
            status={status}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'detail' && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentPage('list')}
          />
        )}

        {currentPage === 'cart' && <Cart onNavigate={handleNavigate} />}

        {currentPage === 'checkout' && (
          <RequireAuth
            isAuthenticated={isAuthenticated}
            onGoToLogin={() => handleGoToLogin('checkout')}
          >
            <Checkout onNavigate={handleNavigate} />
          </RequireAuth>
        )}

        {currentPage === 'login' && (
          <Auth onSuccess={() => setCurrentPage(postLoginPage)} />
        )}
      </main>
    </div>
  )
}

export default App
