import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./HomeSlice";
import authReducer from "./userloginedslice";
import favouriteReducer from "./favouriteslice";

const store = configureStore({
  reducer: {
    homes: homeReducer,
    auth: authReducer,
    favourites: favouriteReducer,
  },
});

// Add these
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;