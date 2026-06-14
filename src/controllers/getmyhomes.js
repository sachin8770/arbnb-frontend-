import { API_BASE_URL } from "./apiConfig";

export const getMyHomes = async () => {
  const response = await fetch(
    `${API_BASE_URL}/host/my-homes`,
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