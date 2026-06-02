import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  authChecked: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authCheckStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.authChecked = true;
      state.error = null;
    },

    authFail: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.authChecked = true;
      state.error = action.payload || null;
    },

    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.authChecked = true;
      state.error = null;
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const {
  authCheckStart,
  loginSuccess,
  authFail,
  logoutUser,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;