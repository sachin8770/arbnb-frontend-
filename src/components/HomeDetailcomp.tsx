import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getHomeById } from "../controllers/Gethomebyid";
import { getFavouritesSuccess } from "../store/favouriteslice";
import { createOrder } from "../controllers/createrodercontroller";
import { verifyPayment } from "../controllers/verifypayment";

import type { RootState, AppDispatch } from "../store/store";

interface Home {
  _id: string;
  name: string;
  location: string;
  photo: string;
  price: number;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface CreateOrderResponse {
  homeId: string;
  order: {
    id: string;
    amount: number;
  };
}

declare global {
  interface Window {
    Razorpay: new (
      options: Record<string, unknown>
    ) => {
      open: () => void;
    };
  }
}

const HomeDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { homeId } = useParams<{ homeId: string }>();

  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const [home, setHome] = useState<Home | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleBooking = async (): Promise<void> => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    if (!home) return;

    try {
      const data: CreateOrderResponse = await createOrder(home._id);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY as string,

        amount: data.order.amount,

        currency: "INR",

        order_id: data.order.id,

        name: "Arbnb",

        description: home.name,

        handler: async (
          response: RazorpayResponse
        ): Promise<void> => {
          try {
            const verifyData = await verifyPayment({
              homeId: data.homeId,

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            });

            if (verifyData.success) {
              navigate("/my-bookings");
            }
          } catch (error: unknown) {
            if (error instanceof Error) {
              alert(error.message);
            }
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Booking failed");
      }
    }
  };

  useEffect(() => {
    const fetchHome = async (): Promise<void> => {
      if (!homeId) return;

      try {
        const data: Home = await getHomeById(homeId);
        setHome(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHome();
  }, [homeId]);

  useEffect(() => {
    if (user?.favourites) {
      dispatch(
        getFavouritesSuccess(user.favourites)
      );
    }
  }, [user, dispatch]);

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  if (!home) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Home Not Found
      </h1>
    );
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
          <h1 className="text-3xl font-bold">
            {home.name}
          </h1>

          <p className="text-gray-600 mt-2 text-lg">
            📍 {home.location}
          </p>

          <p className="text-2xl font-semibold mt-4 text-green-600">
            ₹{home.price} / night
          </p>

          <p className="mt-4 text-gray-500 leading-relaxed">
            Enjoy a comfortable stay at this beautiful
            property located in {home.location}. Perfect
            for travelers looking for peace, comfort,
            and convenience.
          </p>
        </div>

        {/* Right Card */}
        <div className="w-full md:w-80 p-5 border rounded-xl shadow-md bg-white">
          <p className="text-xl font-bold text-center mb-4">
            ₹{home.price} / night
          </p>

          <button
            onClick={handleBooking}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Book Now
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            You won't be charged yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeDetail;