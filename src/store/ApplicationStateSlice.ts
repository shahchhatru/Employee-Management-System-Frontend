import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationEditableFields {
  text: string;
  type: string;
  supervisor: string;
}

const initialState: ApplicationEditableFields = {
  text: null,
  type: null,
  supervisor: null,
};

export const applicationStateSlice = createSlice({
  name: "applicationState",
  initialState,
  reducers: {
    setApplicationState: (
      state,
      action: PayloadAction<ApplicationEditableFields>
    ) => {
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setSupervisor(state, action: PayloadAction<string>) {
      state.supervisor = action.payload;
    },
    setInitialState: () => initialState,
  },
});

export const {
  setApplicationState,
  setText,
  setType,
  setInitialState,
  setSupervisor,
} = applicationStateSlice.actions;
export default applicationStateSlice.reducer;
