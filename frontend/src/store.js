import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/ApiSlice';
import userReducer from './slices/UserSlice';
import adminReducer from './slices/AdminSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user:  userReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
