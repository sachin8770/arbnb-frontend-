import { API_BASE_URL } from "./apiConfig";

export const getMyBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/host/my-bookings`, {
    credentials: "include",
  });

  const data = await response.json(); 

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to get booked homes"
    );
  }

  return data;
};