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
      localStorage.removeItem("token");
    },
    updateCart(state, action) {
      if (state.auth) state.auth.cart = action.payload;
    },
    updateShippingAddress(state, action) {
      if (state.auth) state.auth.shipping_address = action.payload;
    },
    updateCheckout(state, action) {
      if (state.auth) state.auth.checkout = { ...(state.auth.checkout || {}), ...action.payload };
    },
    placeOrder(state) {
      if (!state.auth) return;
      state.auth.cart = [];
      state.auth.checkout = null;
    },
  }
})

export default authSlice.reducer; 
export const { login, logout, updateCart, updateShippingAddress, updateCheckout, placeOrder } = authSlice.actions;