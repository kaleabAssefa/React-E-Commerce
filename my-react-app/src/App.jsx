import { useState } from 'react'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import products from './data/products.js'
import './App.css'

function App() {
  // Which section is visible: 'list' | 'detail' | 'cart' | 'checkout'
  const [currentPage, setCurrentPage] = useState('list')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || null

  function handleSelectProduct(productId) {
    setSelectedProductId(productId)
    setCurrentPage('detail')
  }

  function handleAddToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setCurrentPage('cart')
  }

  function handleUpdateQuantity(productId, quantity) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  function handleRemoveFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  function handlePlaceOrder() {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartCount={cartCount}
      />

      <main className="app__main">
        {currentPage === 'list' && (
          <ProductList
            products={products}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'detail' && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentPage('list')}
          />
        )}

        {currentPage === 'cart' && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout
            cartItems={cartItems}
            onNavigate={setCurrentPage}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
      </main>
    </div>
  )
}

export default App
