import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Home } from "../types/Home";




interface HomeState {
  homes: Home[];
  loading: boolean;
  error: string | null;
  fetchDone: boolean;
}


const initialState: HomeState = {
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

   
    fetchHomesSuccess: (
      state,
      action: PayloadAction<Home[]>
    ) => {
      state.loading = false;
      state.homes = action.payload;
    },

    markFetchdone: (state) => {
      state.fetchDone = true;
    },

    resetFetchdone: (state) => {
      state.fetchDone = false;
    },

    
    fetchHomesError: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    
    addHomeSuccess: (
      state,
      action: PayloadAction<Home>
    ) => {
      state.homes.push(action.payload);
    },

   
    markHomeFavourite: (
      state,
      action: PayloadAction<string>
    ) => {
      const home = state.homes.find(
        (home) => home._id === action.payload
      );

      if (home) {
        home.isFavourite = true;
      }
    },

   
    markHomeUnfavourite: (
      state,
      action: PayloadAction<string>
    ) => {
      const home = state.homes.find((home) => home._id === action.payload);

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
  markHomeFavourite,
  markHomeUnfavourite,
} = homeSlice.actions;

export default homeSlice.reducer;