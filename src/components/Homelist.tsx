import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { gethomesfrmdb } from "../controllers/gethomescontroller";
import { addFavourite } from "../controllers/AddtoFavourities";
import { removefromfavourites } from "../controllers/removefromfavourites";

import {
  fetchHomesStart,
  fetchHomesSuccess,
  fetchHomesError,
  markFetchdone,
  markHomeFavourite,
  markHomeUnfavourite,
} from "../store/HomeSlice";

import {
  favouriteRequestStart,
  favouriteRequestFail,
} from "../store/favouriteslice";

import { AppDispatch, RootState } from "../store/store";
import { Home } from "../types/Home";

function HomeList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    homes,
    loading,
    error,
    fetchDone,
  } = useSelector(
    (state: RootState) => state.homes
  );

  const handleViewDetails = (homeId: string) => {
    navigate(`/homes/${homeId}`);
  };

  const addToFavouriteHandler = async (
    homeId: string
  ) => {
    try {
      dispatch(favouriteRequestStart());

      await addFavourite(homeId);

      dispatch(markHomeFavourite(homeId));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(favouriteRequestFail(err.message));
      }
    }
  };

  const removeFavouriteshandeler = async (
    homeId: string
  ) => {
    try {
      dispatch(favouriteRequestStart());

      await removefromfavourites(homeId);

      dispatch(markHomeUnfavourite(homeId));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(favouriteRequestFail(err.message));
      }
    }
  };

  useEffect(() => {
    if (fetchDone) return;

    const getHomes = async () => {
      try {
        dispatch(fetchHomesStart());

        const data = await gethomesfrmdb();

        dispatch(
          fetchHomesSuccess(data.data || data)
        );

        dispatch(markFetchdone());
      } catch (err) {
        if (err instanceof Error) {
          dispatch(fetchHomesError(err.message));
        }
      }
    };

    getHomes();
  }, [dispatch, fetchDone]);

  if (loading) {
    return (
      <h2 className="text-xl font-semibold">
        Loading homes...
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {homes.map((home: Home) => {
        const isFavourite =
          home.isFavourite;

        return (
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

              <div className="flex gap-3 mt-4">
                {user && (
                  <button
                    onClick={() =>
                      isFavourite
                        ? removeFavouriteshandeler(
                            home._id
                          )
                        : addToFavouriteHandler(
                            home._id
                          )
                    }
                    className="flex-1 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600"
                  >
                    {isFavourite
                      ? "Remove Favourite"
                      : "Add Favourite"}
                  </button>
                )}

                {user && (
                  <button
                    onClick={() =>
                      handleViewDetails(home._id)
                    }
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HomeList;