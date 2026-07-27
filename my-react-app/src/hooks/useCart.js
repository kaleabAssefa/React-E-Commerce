import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../store/slices/cartSlice.js'

export function useCart() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return {
    items,
    count,
    subtotal,
    addToCart: (product) => dispatch(addToCart(product)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart()),
  }
}
