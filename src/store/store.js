import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./HomeSlice";
import authReducer from './userloginedslice';
import favouriteReducer from './favouriteslice';
const store = configureStore({
  reducer: {
    homes: homeReducer,
    auth: authReducer,
    favourites: favouriteReducer,

  },
});

export default store;