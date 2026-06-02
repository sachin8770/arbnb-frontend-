export const getFavourites = async () => {
  const response = await fetch(
    "http://localhost:3000/favourites",
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch favourites"
    );
  }

  console.log(data);

  return data;
};