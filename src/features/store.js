import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from './auth/authSlice'
import storage from 'redux-persist/es/storage'
import { persistStore, persistReducer } from 'redux-persist';
const persistConfig = { 
  key: 'token',
  storage,
  whitelist: ['auth'], 
}

const reducer = combineReducers({ 
  auth: AuthReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => { 
    return getDefaultMiddleware({ 
      serializableCheck: false,
    })
  }
});

export const persistor = persistStore(store);