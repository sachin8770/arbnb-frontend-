export const searchHomes = async (searchText) => {
  const response = await fetch(
    `https://arbnb-backend-testing.onrender.com/host/search?query=${searchText}`,
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