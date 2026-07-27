import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import products from '../../data/products.js'

// Simulates hitting a real API. Wrapped in a thunk so components can
// trigger it from a useEffect and react to loading/error state, the
// same way they would with a real fetch() call.
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return products
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer
