export const searchHomes = async (searchText) => {
  const response = await fetch(
    `http://localhost:3000/host/search?query=${searchText}`,
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