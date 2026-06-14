import { API_BASE_URL } from "./apiConfig";

export const searchHomes = async (searchText) => {
  const response = await fetch(
    `${API_BASE_URL}/host/search?query=${searchText}`,
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