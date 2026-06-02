import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homes: [],
  loading: false,
  error: null,
  fetchDone: false,
};

const homeSlice = createSlice({
  name: "homes",
  initialState,

  reducers: {
    fetchHomesStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchHomesSuccess: (state, action) => {
      state.loading = false;
      state.homes = action.payload;
    },

    markFetchdone: (state) => {
      state.fetchDone = true;
    },

    resetFetchdone: (state) => {
      state.fetchDone = false;
    },

    fetchHomesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addHomeSuccess: (state, action) => {
      state.homes.push(action.payload);
    },

    // NEW
    markHomeFavourite: (state, action) => {
      const home = state.homes.find(
        (home) => home._id === action.payload
      );

      if (home) {
        home.isFavourite = true;
      }
    },

    // NEW
    markHomeUnfavourite: (state, action) => {
      const home = state.homes.find(
        (home) => home._id === action.payload
      );

      if (home) {
        home.isFavourite = false;
      }
    },
  },
});

export const {
  fetchHomesStart,
  fetchHomesSuccess,
  fetchHomesError,
  addHomeSuccess,
  markFetchdone,
  resetFetchdone,

  // NEW EXPORTS
  markHomeFavourite,
  markHomeUnfavourite,
} = homeSlice.actions;

export default homeSlice.reducer;