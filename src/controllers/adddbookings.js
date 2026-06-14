export const addBooking = async (homeId) => {
  const response = await fetch(
    `https://arbnb-backend-testing.onrender.com/host/bookings/${homeId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data;
};