import { useEffect, useState } from "react";
import { getMyBookings } from "../controllers/getbookings";

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        console.log(data);
        setBookings(data);
      } catch (err) {
        console.log(err);
        const message =
          err?.response?.data?.message || 
          err?.message ||                   
          "Failed to fetch bookings";       
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
};