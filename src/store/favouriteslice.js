import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
  loading: false,
  error: null,
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,

  reducers: {
    favouriteRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    getFavouritesSuccess: (state, action) => {
      state.loading = false;
      state.favourites = action.payload;
      state.error = null;
    },

    addFavouriteSuccess: (state, action) => {
      state.loading = false;
      state.favourites.push(action.payload);
      state.error = null;
    },

    removeFavouriteSuccess: (state, action) => {
      state.loading = false;

      state.favourites = state.favourites.filter(
        (home) => home._id !== action.payload
      );

      state.error = null;
    },

    favouriteRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearFavourites: (state) => {
      state.favourites = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  favouriteRequestStart,
  getFavouritesSuccess,
  addFavouriteSuccess,
  removeFavouriteSuccess,
  favouriteRequestFail,
  clearFavourites,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;