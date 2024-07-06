import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  qrCode: "",
};

const qrCodeSlice = createSlice({
  name: "qrCode",
  initialState,
  reducers: {
    setQrCode(state, action: PayloadAction<string>) {
      state.qrCode = action.payload;
    },
    clearQrCode(state) {
      state.qrCode = "";
    },
  },
});

export const { setQrCode, clearQrCode } = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
