export const getMyHomes = async () => {
  const response = await fetch(
    "http://localhost:3000/host/my-homes",
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