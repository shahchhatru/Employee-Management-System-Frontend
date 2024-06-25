import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeInputType } from "../types/employee";

const initialState: EmployeeInputType = {
  designation: "",
  salary: 0,
  joiningDate: "",
  skills: "",
  user: "",
};

export const employeeStateSlice = createSlice({
  name: "employeeState",
  initialState,
  reducers: {
    setEmployeeState: (state, action: PayloadAction<EmployeeInputType>) => {
      state.designation = action.payload.designation;
      state.salary = action.payload.salary;
      state.joiningDate = action.payload.joiningDate;
      state.skills = action.payload.skills;
      state.user = action.payload.user;
    },
    setDesignation: (state, action: PayloadAction<string>) => {
      state.designation = action.payload;
    },
    setSalary: (state, action: PayloadAction<number>) => {
      state.salary = action.payload;
    },
    setJoiningDate: (state, action: PayloadAction<string>) => {
      state.joiningDate = action.payload;
    },
    setskills: (state, action: PayloadAction<string>) => {
      state.skills = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setDesignation,
  setSalary,
  setJoiningDate,
  setskills,
  setUser,
  setEmployeeState,
} = employeeStateSlice.actions;

export default employeeStateSlice.reducer;
