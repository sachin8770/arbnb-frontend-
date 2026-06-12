import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import type { RootState } from "../store/store";

import { getFavourites } from "../controllers/getfavouritescontrollr";
import { removefromfavourites } from "../controllers/removefromfavourites";
import { Favourite } from "../types/Favourites";
import {
  favouriteRequestStart,
  getFavouritesSuccess,
  removeFavouriteSuccess,
  favouriteRequestFail,
} from "../store/favouriteslice";

import { markHomeUnfavourite } from "../store/HomeSlice";


export interface RemoveFavouriteData {
  homeId: string;
}

export interface RemoveFavouriteResponse {
  statusCode: number;
  data: RemoveFavouriteData;
  message: string;
  success: boolean;
}
export interface FavouritesResponse {
  statusCode: number;
  data: Favourite[];
  message: string;
  success: boolean;
}



function Favourites() {
  const dispatch = useDispatch<AppDispatch>();

  const { favourites, loading, error } = useSelector(
    (state: RootState) => state.favourites
  );

  useEffect(() => {
    const fetchFavourites = async (): Promise<void> => {
      try {
        dispatch(favouriteRequestStart());

        const data:FavouritesResponse = await getFavourites();

        console.log(data);

        dispatch(
          getFavouritesSuccess(data.data)
        );
      } catch (err: any) {
        console.log(err?.message);

        dispatch(
          favouriteRequestFail(
            err?.message || "Failed to fetch favourites"
          )
        );
      }
    };

    fetchFavourites();
  }, [dispatch]);

  const removeFavouriteHandler = async (
    homeId: string
  ): Promise<void> => {
    try {
      dispatch(favouriteRequestStart());

      const data :RemoveFavouriteResponse   = await removefromfavourites(homeId);

      console.log(data);

      dispatch(removeFavouriteSuccess(data.data.homeId));

      dispatch(markHomeUnfavourite(data.data.homeId));
    } catch (err: any) {
      dispatch(
        favouriteRequestFail(
          err?.message || "Failed to remove favourite"
        )
      );
    }
  };

  if (loading) {
    return (
      <h2 className="text-xl font-semibold">
        Loading favourites...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-red-500 font-semibold">
        {error}
      </h2>
    );
  }

  if (!favourites || favourites.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold">
          No Favourite Homes Yet
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {favourites.map((home: Favourite) => (
        <div
          key={home._id}
          className="bg-white rounded-2xl shadow border overflow-hidden"
        >
          <img
            src={home.photo}
            alt={home.name}
            className="w-full h-52 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">
              {home.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {home.location}
            </p>

            <p className="text-rose-500 font-bold mt-3">
              ₹{home.price}
            </p>

            <p className="text-gray-600 font-semibold mt-2">
              ⭐ {home.rating}
            </p>

            <div className="mt-4">
              <button
                onClick={() =>
                  removeFavouriteHandler(home._id)
                }
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Remove Favourite
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Favourites;