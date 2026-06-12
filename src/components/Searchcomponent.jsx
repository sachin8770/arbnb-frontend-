import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchHomes } from "../controllers/searchHomes";

function SearchResults() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const data = await searchHomes(query);
        console.log(data);
        setHomes(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchHomes();
    }
  }, [query]);

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Searching...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {homes.length === 0 ? (
        <p className="text-gray-500">
          No homes found.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {homes.map((home) => (
            <div
              key={home._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={home.photo}
                alt={home.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {home.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  📍 {home.location}
                </p>

                <p className="text-green-600 font-bold mt-3">
                  ₹{home.price}/night
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;