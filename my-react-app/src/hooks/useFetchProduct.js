import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice.js'

// Kicks off the (simulated) fetch once, the first time any component
// using this hook mounts, then just reads from the shared Redux state
// afterwards.
export function useFetchProducts() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  return { products: items, status, error }
}
