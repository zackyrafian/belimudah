import { UserStorage } from "@/services/user.service";
import { createSlice } from "@reduxjs/toolkit"
const initialState = { 
  user: null,
}
const authSlice = createSlice({ 
  name: 'auth', 
  initialState,
  reducers: { 
    login(state, action) { 
      state.user = action.payload;
      UserStorage.syncUser(action.payload);
    },
    logout(state) { 
      state.data = null;
    },
    updateUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
      UserStorage.syncUser(state.user);
    }
  }
})

export default authSlice.reducer; 
export const { login, logout, updateUserData } = authSlice.actions;