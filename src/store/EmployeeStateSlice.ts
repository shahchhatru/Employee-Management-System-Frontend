import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeInputType } from "../types/employee";

const initialState: EmployeeInputType = {
    designation: "",
    salary: 0,
    joiningDate: "",
    skillLevel: "",
    user: ""
}

export const employeeStateSlice = createSlice({
    name: "employeeState",
    initialState,
    reducers: {
        setEmployeeState: (state, action: PayloadAction<EmployeeInputType>) => {
            state.designation = action.payload.designation;
            state.salary = action.payload.salary;
            state.joiningDate = action.payload.joiningDate;
            state.skillLevel = action.payload.skillLevel;
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
        setSkillLevel: (state, action: PayloadAction<string>) => {
            state.skillLevel = action.payload;
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
    setSkillLevel,
    setUser,
    setEmployeeState
} = employeeStateSlice.actions;


export default employeeStateSlice.reducer;