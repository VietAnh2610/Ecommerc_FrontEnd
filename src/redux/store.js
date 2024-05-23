import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import userReducer from './counter/userSlide'
import orderReducer from './counter/orderSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer,
    order:orderReducer,
    devTools: process.env.NODE_ENV !== 'production',
  },
  
})