import { useState } from 'react'
import './Checkout.css'

const initialForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  zip: '',
}

function Checkout({ cartItems, onNavigate, onPlaceOrder }) {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const shipping = cartItems.length > 0 ? 6 : 0
  const total = subtotal + shipping

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    onPlaceOrder?.(form)
  }

  if (cartItems.length === 0 && !submitted) {
    return (
      <section className="checkout checkout--empty">
        <h1>Nothing to check out yet</h1>
        <p>Add a specimen to your cart before checking out.</p>
        <button className="btn btn--primary" onClick={() => onNavigate('list')}>
          Go to shop
        </button>
      </section>
    )
  }

  if (submitted) {
    return (
      <section className="checkout checkout--confirmed">
        <h1>Order placed 🌿</h1>
        <p>
          Thanks, {form.name || 'friend'}. A confirmation will be sent to{' '}
          {form.email || 'your email'}. Your plants are on their way to{' '}
          {form.address || 'your address'}.
        </p>
        <button className="btn btn--primary" onClick={() => onNavigate('list')}>
          Back to shop
        </button>
      </section>
    )
  }

  return (
    <section className="checkout">
      <h1>Checkout</h1>

      <div className="checkout__layout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <h2>Delivery details</h2>

          <label className="checkout__field">
            <span>Full name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="checkout__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="checkout__field">
            <span>Address</span>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </label>

          <div className="checkout__field-row">
            <label className="checkout__field">
              <span>City</span>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </label>

            <label className="checkout__field">
              <span>ZIP code</span>
              <input
                type="text"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="btn btn--primary">
            Place order
          </button>
        </form>

        <aside className="checkout__summary">
          <h2>Order summary</h2>
          <ul className="checkout__items">
            {cartItems.map((item) => (
              <li key={item.id} className="checkout__item">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="checkout__totals">
            <div className="checkout__row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout__row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="checkout__row checkout__row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
