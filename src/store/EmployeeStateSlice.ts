import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeInputType, EmployeeWithUserInputType } from "../types/employee";

const initialState: EmployeeWithUserInputType = {
    designation: "",
    salary: 0,
    joiningDate: "",
    skills: "",
    user: null,
    name: null,
    email: null,
    role: null,
    password: null,
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
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setInitialState: () => initialState,
    },
});

export const {
    setDesignation,
    setSalary,
    setJoiningDate,
    setskills,
    setUser,
    setEmployeeState,
    setInitialState,
    setName,
    setEmail,
    setRole,
    setPassword

} = employeeStateSlice.actions;

export default employeeStateSlice.reducer;
