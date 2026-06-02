export const removefromfavourites = async (homeId) => {
  const response = await fetch(
    `http://localhost:3000/host/remove-favourite/${homeId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove favourite"
    );
  }

  return data;
};