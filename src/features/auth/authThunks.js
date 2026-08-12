import { AuthService } from "@/services/auth.service"
import { UserService } from "@/services/user.service"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  `auth/login`, 
  async(credentials, { rejectWithValue }) => { 
    try {
      const data = await AuthService.login(credentials);
      return data;
    } catch(error) { 
      return rejectWithValue(error.message);
    }
  }
)

export const userInfoAsync = createAsyncThunk(
  `auth/fetchUserInfo`,
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const userInfo = await UserService.getUserInfo(token);
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const authThunks = { 
  loginAsync, 
  userInfoAsync,
}

export default authThunks;