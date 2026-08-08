
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authThunks from "./authThunks"

const initialState = { 
  auth: null,
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => { 
    builder
      .addCase(authThunks.loginAsync.pending, (state) => { 
        state.loading = true;
        state.error = null; 
      })
      .addCase(authThunks.loginAsync.fulfilled, (state, action) => { 
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(authThunks.loginAsync.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authThunks.userInfoAsync.pending, (state) => { 
        state.loading = true;
      })
      .addCase(authThunks.userInfoAsync.fulfilled, (state, action) => { 
        state.loading = false;
        if (state.auth) {
          state.auth = { ...state.auth, ...action.payload };
        } else {
          state.auth = action.payload;
        }
      })
      .addCase(authThunks.userInfoAsync.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export default authSlice.reducer; 
export const { login, logout, updateCart, updateShippingAddress, updateCheckout, placeOrder } = authSlice.actions;