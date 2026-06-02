import React from "react";
import { NavLink } from "react-router-dom";
import { postlogoutuser } from '../controllers/logoutcontroller';
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  Building2,
  CalendarCheck,
  Heart,
  PlusCircle,
  User,
  LogOut,
} from "lucide-react";
import { logoutUser } from "../store/userloginedslice";

function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handellogout = async () => {
    try {
      const logoutdata = await postlogoutuser();

      console.log(logoutdata);

      // this clears user from Redux
      dispatch(logoutUser());
    } catch (err) {
      console.log("logout error", err.message);
    }
  };

  return (
<aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 hidden lg:block">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Dashboard
        </h2>

        <nav className="space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            <Home size={20} />
            Home
          </NavLink>




          <NavLink
            to="/addHome"
            className={user?.role=="host"?"flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-500":"hidden"}
          >
            <PlusCircle size={20} />

            Add Homes
          </NavLink>

          <NavLink
            to="/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            <CalendarCheck size={20} />
            Bookings
          </NavLink>

          <NavLink
            to="/favourites"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            <Heart size={20} />
            Favourites
          </NavLink>

          <NavLink
            to="/Hosthome"
            className={user?.role=="host"?"flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-500":"hidden"}
          >

            <Building2 size={20} />
            My Homes
          </NavLink>

          <NavLink
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-rose-500"
          >
            <User size={20} />
            Profile
          </NavLink>
        </nav>

        <div className={!user ? "hidden" : "mt-10 border-t border-gray-200 pt-5"}>
          <button onClick={handellogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-500 w-full">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;