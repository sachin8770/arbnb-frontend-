import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";

import App from "./App.jsx";
import Bodycomp from "./components/Bodycomp.jsx";
import Home from "./components/Home.jsx";

import AddHome from "./components/Addhomecomp.js";

import Signup from "./components/Signupcomp.jsx";
import Login from "./components/Logincomp.jsx";
import Favourites from "./components/Favouritescomponent.jsx";
import Profile from "./components/frofilecomp.jsx";
import HomeDetail from "./components/HomeDetailcomp.jsx";
import MyBookings from "./components/mybookings.jsx";
import MyHomes from "./components/Myhomescomp.jsx";
import SearchResults from "./components/Searchcomponent.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/addHome",
        element: <AddHome></AddHome>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/favourites",
        element: <Favourites />
      },
      {
        path: "/profile",
        element: <Profile />
      }
      , {
        path: "/homes/:homeId",
        element: <HomeDetail />
      },
      {
        path: "/my-bookings",
        element: <MyBookings />
      },
      {
        path: "/Hosthome",
        element: <MyHomes />
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
    ]
  },
]);



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);