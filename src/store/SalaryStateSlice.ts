import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SalaryStateInputs } from "../types/salary";

const initialState: SalaryStateInputs = {
    baseAmount: 0,
    bonus: 0,
    tax: 0,
    pf: 0,
    netAmount: 0,
    user: "",
};

export const salaryStateSlice = createSlice({
    name: "salaryState",
    initialState,
    reducers: {
        setSalaryState: (state, action: PayloadAction<SalaryStateInputs>) => {
            state.baseAmount = action.payload.baseAmount;
            state.bonus = action.payload.bonus;
            state.tax = action.payload.tax;
            state.pf = action.payload.pf;
            state.netAmount = action.payload.netAmount;
            state.user = action.payload.user;
        },
        setBaseAmount: (state, action: PayloadAction<number>) => {
            state.baseAmount = action.payload;
        },
        setBonus: (state, action: PayloadAction<number>) => {
            state.bonus = action.payload;
        },
        setTax: (state, action: PayloadAction<number>) => {
            state.tax = action.payload;
        },
        setPf: (state, action: PayloadAction<number>) => {
            state.pf = action.payload;
        },
        setNetAmount: (state, action: PayloadAction<number>) => {
            state.netAmount = action.payload;
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        setInitialState: () => initialState,
    },
});

export const {
    setSalaryState,
    setBaseAmount,
    setBonus,
    setTax,
    setPf,
    setNetAmount,
    setUser,
    setInitialState,
} = salaryStateSlice.actions;

export default salaryStateSlice.reducer;