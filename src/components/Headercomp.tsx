import { Search, Menu, UserCircle, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import type { RootState } from "../store/store";

interface Home {
  _id: string;
  owner: string;
  name: string;
  price: number;
  location: string;
  rating: number | null;
  photo: string;
  isFavourite: boolean;
}

function Header() {
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  const homes = useSelector(
    (state: RootState) => state.homes.homes
  ) as Home[];

  const favouriteCount = homes.filter(
    (home: Home) => home.isFavourite
  ).length;

  const handleSearch = async (): Promise<void> => {
    try {
      navigate(`/search?query=${search}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (<header className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50"> {/* Left side logo */}
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-xl"> A </div>
      <h1 className="text-2xl font-bold text-rose-500">Airbnb</h1>
    </div> {/* Center search bar */}
    <div className="hidden md:flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden">
      <button className="px-5 py-3 font-semibold text-sm hover:bg-gray-100"> Anywhere </button>
      <div className="h-6 w-px bg-gray-300"></div>
      <button className="px-5 py-3 font-semibold text-sm hover:bg-gray-100"> Any week </button>
      <div className="h-6 w-px bg-gray-300"></div>
      <button className="px-5 py-3 text-gray-500 text-sm hover:bg-gray-100"> Add guests </button>
      <input type="text" placeholder="Search for homes here..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-80 px-4 py-2 border border-gray-300 rounded-full outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition" />
      <button onClick={handleSearch} className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center mr-2 hover:bg-rose-600" >
        <Search size={18} /> </button> </div> {/* Right side buttons */}
    <div className="flex items-center gap-4">
      <div className={user ? "hidden" : "flex items-center gap-4"}>
        <Link to="/signup" className="px-5 py-2 rounded-full border border-rose-500 text-rose-500 font-semibold hover:bg-rose-50 transition" > Signup
        </Link> <Link to="/login" className="px-5 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition" > Login </Link>
      </div> <Link to="/Hosthome" className="px-5 py-2 rounded-full bg-rose-500 text-white font-semibold hover:bg-rose-600 transition" > Arbnb your homes </Link>
      <div className="relative"> <Heart className="cursor-pointer" onClick={() => navigate("/favourites")} />
        <span className="absolute -top-2 -right-2"> {favouriteCount} </span>
      </div> <Link to="/profile"> <button className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md">
        <Menu size={22} /> <UserCircle size={26} /> </button>
      </Link> </div> </header>);
}


export default Header;