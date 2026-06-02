import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHomeById } from "../controllers/Gethomebyid";

  
import { useNavigate, useLocation } from "react-router-dom";
const HomeDetail = () => {
  const { homeId } = useParams();


const navigate = useNavigate();


const user = null;



const location = useLocation();

const handleBooking = () => {
  if (!user) {
    navigate("/login", {
      state: { from: location.pathname }
    });
    return;
  }

  navigate(`/book/${home._id}`);
};;
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const data = await getHomeById(homeId);
        setHome(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [homeId]);

  if (loading) {
    return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
  }

  if (!home) {
    return <h1 className="text-center mt-10 text-xl">Home Not Found</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Image Section */}
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={home.photo}
          alt={home.name}
          className="w-full h-[450px] object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-start gap-6">

        {/* Left Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{home.name}</h1>

          <p className="text-gray-600 mt-2 text-lg">
            📍 {home.location}
          </p>

          <p className="text-2xl font-semibold mt-4 text-green-600">
            ₹{home.price} / night
          </p>

          <p className="mt-4 text-gray-500 leading-relaxed">
            Enjoy a comfortable stay at this beautiful property located in {home.location}.
            Perfect for travelers looking for peace, comfort, and convenience.
          </p>
        </div>

        {/* Right Card (Booking Box) */}
        <div className="w-full md:w-80 p-5 border rounded-xl shadow-md bg-white">

          <p className="text-xl font-bold text-center mb-4">
            ₹{home.price} / night
          </p>

          <button onClick={handleBooking}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Book Now
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            You won’t be charged yet
          </p>
        </div>

      </div>
    </div>
  );
};

export default HomeDetail;