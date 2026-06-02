import React from "react";
import { Search, Menu, UserCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
   const {user} = useSelector((state) => state.auth);
  
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Left side logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-xl">
          A
        </div>
        <h1 className="text-2xl font-bold text-rose-500">Airbnb</h1>
      </div>

      {/* Center search bar */}
      <div className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden">
        <button className="px-5 py-3 font-semibold text-sm hover:bg-gray-100">
          Anywhere
        </button>

        <div className="h-6 w-px bg-gray-300"></div>

        <button className="px-5 py-3 font-semibold text-sm hover:bg-gray-100">
          Any week
        </button>

        <div className="h-6 w-px bg-gray-300"></div>

        <button className="px-5 py-3 text-gray-500 text-sm hover:bg-gray-100">
          Add guests
        </button>

        <button className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center mr-2 hover:bg-rose-600">
          <Search size={18} />
        </button>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <div className={user ? "hidden" : "flex items-center gap-4"}>
        <Link 
          to="/signup"
          className="px-5 py-2 rounded-full border border-rose-500 text-rose-500 font-semibold hover:bg-rose-50 transition"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="px-5 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
        >
          Login
        </Link>
        </div>
        <button className="hidden lg:block font-semibold hover:bg-gray-100 px-4 py-2 rounded-full">
          Airbnb your home
        </button>

        <button className="hidden md:block text-gray-700 hover:text-rose-500">
          <Heart size={22} />
        </button>

        <button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md">
          <Menu size={22} />
          <UserCircle size={26} />
        </button>
      </div>
    </header>
  );
}

export default Header;