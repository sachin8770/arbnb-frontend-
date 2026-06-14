import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";



interface InitialState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  authChecked: boolean;
  error: string | null;
}

const initialState: InitialState = {
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

    loginSuccess: (
      state,
      action: PayloadAction<User>
    ) => {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      state.authChecked = true;
      state.error = null;
    },

    authFail: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.authChecked = true;
      state.error = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.authChecked = true;
      state.error = null;
    },

    updateUser: (
      state,
      action: PayloadAction<Partial<User>>
    ) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
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