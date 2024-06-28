// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { profileApi } from "./ProfileSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import UpdateProfileReducer from './UpdateProfileSlice';
import { employeeApi } from "./EmployeeSlice";
import EmployeeStateReducer from "./EmployeeStateSlice";
import { applicationApi } from "./ApplicationSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    updateProfile: UpdateProfileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    employeeState: EmployeeStateReducer,
    [applicationApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(profileApi.middleware).concat(employeeApi.middleware).concat(applicationApi.middleware);
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
