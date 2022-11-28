import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "Admin 1",
    type: "admin",
    username: "admin",
    password: "admin123",
    username: "janedoe18",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
