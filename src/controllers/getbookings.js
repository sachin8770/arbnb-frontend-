export const getMyBookings = async () => {
  const response = await fetch("https://arbnb-backend-testing.onrender.com/host/my-bookings", {
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