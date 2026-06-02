import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavourites } from "../controllers/getfavouritescontrollr";
import { removefromfavourites } from "../controllers/removefromfavourites";

import {
    favouriteRequestStart,
    getFavouritesSuccess,
    removeFavouriteSuccess,
    favouriteRequestFail,
} from "../store/favouriteslice";

function Favourites() {
    const dispatch = useDispatch();

    const { favourites, loading, error } = useSelector(
        (state) => state.favourites
    );

    useEffect(() => {
        
        const fetchFavourites = async () => {
            try {
                dispatch(favouriteRequestStart());

                const data = await getFavourites();
                console.log(data);
                dispatch(
                    getFavouritesSuccess(data.data || data)
                );
            } catch (err) {
                dispatch(
                    favouriteRequestFail(err.message)
                );
            }
        };

        fetchFavourites();
    }, [dispatch]);

    const removeFavouriteHandler = async (homeId) => {
        try {
            dispatch(favouriteRequestStart());

           const data= await removefromfavourites(homeId);
           console.log(data);
            dispatch(removeFavouriteSuccess(homeId));
        } catch (err) {
            dispatch(
                favouriteRequestFail(err.message,err.stack)
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
            {favourites.map((home) => (
                <div
                    key={home._id}
                    className="bg-white rounded-2xl shadow border overflow-hidden"
                >
                    <img
                        src={home.photo || home.image || home.imageUrl}
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