import { createSlice } from '@reduxjs/toolkit';

// Helper function to save order to localStorage
const saveOrderToLocalStorage = (order) => {
  localStorage.setItem('order', JSON.stringify(order));
};

// Helper function to load order from localStorage
const loadOrderFromLocalStorage = () => {
  const savedOrder = localStorage.getItem('order');
  return savedOrder ? JSON.parse(savedOrder) : initialState;
};

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
};

const calculatePrices = (state) => {
  state.itemsPrice = state.orderItems.reduce((acc, item) => acc + item.price * item.amount, 0);
  state.shippingPrice = state.itemsPrice > 1000000 ? 0 : 30000;
  state.totalPrice = state.itemsPrice + state.shippingPrice;
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: loadOrderFromLocalStorage(),
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const existingItem = state.orderItems.find((item) => item.product === orderItem.product);
      if (existingItem) {
        existingItem.amount += orderItem.amount;
      } else {
        state.orderItems.push(orderItem);
      }
      calculatePrices(state);
      saveOrderToLocalStorage(state);
    },
    removeOrderProduct: (state, action) => {
      const { productId } = action.payload;
      state.orderItems = state.orderItems.filter((item) => item.product !== productId);
      calculatePrices(state);
      saveOrderToLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const existingItem = state.orderItems.find((item) => item.product === productId);
      if (existingItem) {
        existingItem.amount = amount;
        if (existingItem.amount < 1) {
          existingItem.amount = 1;
        }
      }
      calculatePrices(state);
      saveOrderToLocalStorage(state);
    },
    clearOrder: (state) => {
      state.orderItems = [];
      state.shippingAddress = {};
      state.paymentMethod = '';
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
      state.user = '';
      state.isPaid = false;
      state.paidAt = '';
      state.isDelivered = false;
      state.deliveredAt = '';
      saveOrderToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const itemOrder = state.orderItems.find((item) => item.product === action.payload);
      if (itemOrder) {
        itemOrder.amount += 1;
      }
      calculatePrices(state);
      saveOrderToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const itemOrder = state.orderItems.find((item) => item.product === action.payload);
      if (itemOrder && itemOrder.amount > 1) {
        itemOrder.amount -= 1;
      }
      calculatePrices(state);
      saveOrderToLocalStorage(state);
    },
  },
});

export const { addOrderProduct, removeOrderProduct, updateQuantity, clearOrder, increaseQuantity, decreaseQuantity } = orderSlice.actions;

export default orderSlice.reducer;
