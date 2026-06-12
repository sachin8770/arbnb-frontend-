import React, { useEffect, useState } from "react";
import { getMyHomes } from "../controllers/getMyHomes";

function MyHomes() {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const data = await getMyHomes();
        setHomes(data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Homes
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {homes.map((home) => (
          <div
            key={home._id}
            className="border rounded-xl overflow-hidden shadow"
          >
            <img
              src={home.photo}
              alt={home.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-xl">
                {home.name}
              </h2>

              <p>{home.location}</p>

              <p className="text-green-600 font-bold">
                ₹{home.price}/night
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHomes;