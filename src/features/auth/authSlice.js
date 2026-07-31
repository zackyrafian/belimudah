import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
  auth: null,
}

const authSlice = createSlice({ 
  name: 'auth', 
  initialState,
  reducers: { 
    login(state, action) { 
      state.auth = action.payload;
    },
    logout(state) { 
      state.auth = null;
    },
    updateCart(state, action) {
      state.auth.cart = action.payload;
    },
    updateShippingAddress(state, action) {
      state.auth.shipping_address = action.payload;
    },
    updateCheckout(state, action) {
      state.auth.checkout = action.payload;
    },
    placeOrder(state, action) {
      const currentOrders = state.auth.order || [];
      state.auth.order = [...currentOrders, action.payload];
      state.auth.cart = [];
      state.auth.checkout = null;
    },
  }
})

export default authSlice.reducer; 
export const { login, logout, updateCart, updateShippingAddress, updateCheckout, placeOrder } = authSlice.actions;