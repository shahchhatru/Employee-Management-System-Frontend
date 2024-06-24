// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { profileApi } from "./ProfileSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(profileApi.middleware);
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
