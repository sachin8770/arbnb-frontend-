import Header from "./components/Headercomp.tsx";
import Footer from "./components/footercomp";
import Sidebar from "./components/Sidebarcomp";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  authCheckStart,
  loginSuccess,
  authFail,
} from "./store/userloginedslice";

import { getloginuser } from "./controllers/Getloggineduser";
function App() {
  const dispatch = useDispatch();

useEffect(() => {
  const checkLoginUser = async () => {
    try {
      dispatch(authCheckStart());

      const userlogined = await getloginuser();

      dispatch(loginSuccess(userlogined.data.user));
    } catch (err) {
      dispatch(authFail(null));
    }
  };

  checkLoginUser();
}, [dispatch]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;