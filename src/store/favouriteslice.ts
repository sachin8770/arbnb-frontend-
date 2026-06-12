import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favourite } from "../types/Favourites";

interface InitialState {
  favourites: Favourite[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
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

    getFavouritesSuccess: (
      state,
      action: PayloadAction<Favourite[]>
    ) => {
      state.loading = false;
      state.favourites = action.payload;
      state.error = null;
    },

    addFavouriteSuccess: (
      state,
      action: PayloadAction<Favourite>
    ) => {
      state.loading = false;
      state.favourites.push(action.payload);
      state.error = null;
    },

    removeFavouriteSuccess: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;

      state.favourites = state.favourites.filter(
        (home) => home._id !== action.payload
      );

      state.error = null;
    },

    favouriteRequestFail: (
      state,
      action: PayloadAction<string>
    ) => {
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