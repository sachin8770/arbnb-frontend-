
export const addFavourite = async (homeId) => {
  const response = await fetch(`https://arbnb-backend-testing.onrender.com/host/add-favourite/${homeId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add favourite");
  }

  return data;
};