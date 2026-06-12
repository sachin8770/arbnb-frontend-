export const getMyBookings = async () => {
  const response = await fetch("http://localhost:3000/host/my-bookings", {
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