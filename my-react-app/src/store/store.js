import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice.js'
import cartReducer from './slices/cartSlice.js'
import authReducer from './slices/authSlice.js'
import logger from './middleware/logger.js'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  // getDefaultMiddleware() already includes redux-thunk (needed for the
  // createAsyncThunk call in productsSlice) plus the serializability/
  // immutability checks. We just append our own logger on top of it.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
