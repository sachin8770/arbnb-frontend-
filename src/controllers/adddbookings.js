export const addBooking = async (homeId) => {
  const response = await fetch(
    `http://localhost:3000/host/bookings/${homeId}`,
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