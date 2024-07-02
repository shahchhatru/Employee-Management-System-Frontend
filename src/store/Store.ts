import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { profileApi } from "./ProfileSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import UpdateProfileReducer from "./UpdateProfileSlice";
import { employeeApi } from "./EmployeeSlice";
import EmployeeStateReducer from "./EmployeeStateSlice";
import ApplicationStateReducer from "./ApplicationStateSlice";
import SalaryReducer from "./SalaryStateSlice";
import { applicationApi } from "./ApplicationSlice";
import { userApi } from "./UserSlice";
import { bonusApi } from "./BonusSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    updateProfile: UpdateProfileReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    employeeState: EmployeeStateReducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    applicationState: ApplicationStateReducer,
    salaryState: SalaryReducer,
    [userApi.reducerPath]: userApi.reducer,
    [bonusApi.reducerPath]: bonusApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(applicationApi.middleware)
      .concat(profileApi.middleware)
      .concat(employeeApi.middleware)
      .concat(userApi.middleware)
      .concat(bonusApi.middleware);
  },
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
