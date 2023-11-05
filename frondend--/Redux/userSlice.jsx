import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  phone: "",
  email: "",
  image: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    logoutDetails: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.image = "";
      state.phone = "";
     
    },
   
  },
});

export const { setUserDetails, logoutDetails } = userSlice.actions;
export default userSlice.reducer;
