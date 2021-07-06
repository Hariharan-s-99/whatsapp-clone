import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "toggle",
  initialState: {
    toggle: true,
  },
  reducers: {
  
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = userSlice.actions;

export const selectToggle = (state) => state.toggle.toggle;

export default userSlice.reducer;
