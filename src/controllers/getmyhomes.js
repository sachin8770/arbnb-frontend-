export const getMyHomes = async () => {
  const response = await fetch(
    "https://arbnb-backend-testing.onrender.com/host/my-homes",
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};