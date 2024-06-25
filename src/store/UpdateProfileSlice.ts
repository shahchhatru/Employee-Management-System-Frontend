import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateProfileState {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  says: string;
  image: string;
}
const initialState: UpdateProfileState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  says: "",
  image: "",
};
export const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<UpdateProfileState>) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zip = action.payload.zip;
      state.says = action.payload.says;
      state.image = action.payload.image;
    },
    setFirstname: (state, action: PayloadAction<string>) => {
      state.firstname = action.payload;
    },
    setLastname: (state, action: PayloadAction<string>) => {
      state.lastname = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.zip = action.payload;
    },
    setSays: (state, action: PayloadAction<string>) => {
      state.says = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const {
  updateProfile,
  setFirstname,
  setLastname,
  setEmail,
  setPhone,
  setAddress,
  setCity,
  setState,
  setZip,
  setSays,
  setImage,
} = updateProfileSlice.actions;
export const updateProfileReducer = updateProfileSlice.reducer;
