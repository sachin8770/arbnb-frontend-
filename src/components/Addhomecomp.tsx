import type { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Addhome } from "../controllers/Addhomecontroller";

import {
  addHomeSuccess,
  fetchHomesError,
  fetchHomesStart,
  resetFetchdone,
} from "../store/HomeSlice";

import type { RootState, AppDispatch } from "../store/store";

function AddHome() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector(
    (state: RootState) => state.homes
  );

  const submithandeler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      dispatch(fetchHomesStart());

      const addhomedata = await Addhome(formData);

      console.log(addhomedata);

      dispatch(addHomeSuccess(addhomedata.data));

      dispatch(resetFetchdone());

      navigate("/");
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(fetchHomesError(e.message));
        alert(e.message);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow border">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add Home
      </h1>

      <form
        onSubmit={submithandeler}
        method="POST"
        className="space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Home name"
          required
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          required
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
        />

        <input
          type="file"
          name="photo"
          accept="image/*"
          required
          className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-rose-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 text-white py-3 rounded-xl font-semibold hover:bg-rose-600"
        >
          {loading ? "Adding Home..." : "Add Home"}
        </button>
      </form>
    </div>
  );
}

export default AddHome;