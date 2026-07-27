import { useCart } from '../hooks/useCart.js'
import './Cart.css'

function Cart({ onNavigate }) {
  const { items: cartItems, subtotal, updateQuantity, removeFromCart } =
    useCart()

  if (cartItems.length === 0) {
    return (
      <section className="cart cart--empty">
        <h1>Your cart is empty</h1>
        <p>Browse the catalog and add a specimen or two.</p>
        <button className="btn btn--primary" onClick={() => onNavigate('list')}>
          Go to shop
        </button>
      </section>
    )
  }

  return (
    <section className="cart">
      <h1>Your cart</h1>

      <ul className="cart__list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart__item">
            <div
              className="cart__swatch"
              style={{ background: item.color }}
            />

            <div className="cart__details">
              <p className="cart__name">{item.name}</p>
              <p className="cart__unit-price">${item.price} each</p>
            </div>

            <div className="cart__quantity">
              <button
                className="cart__qty-btn"
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                aria-label={`Decrease quantity of ${item.name}`}
              >
                −
              </button>
              <span className="cart__qty-value">{item.quantity}</span>
              <button
                className="cart__qty-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>

            <p className="cart__line-total">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className="cart__remove"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart__summary">
        <span>Subtotal</span>
        <span className="cart__subtotal">${subtotal.toFixed(2)}</span>
      </div>

      <div className="cart__actions">
        <button className="btn btn--ghost" onClick={() => onNavigate('list')}>
          ← Continue shopping
        </button>
        <button
          className="btn btn--primary"
          onClick={() => onNavigate('checkout')}
        >
          Go to checkout
        </button>
      </div>
    </section>
  )
}

export default Cart
