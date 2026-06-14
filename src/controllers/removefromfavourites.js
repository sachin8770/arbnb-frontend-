import { API_BASE_URL } from "./apiConfig";

export const removefromfavourites = async (homeId) => {
  const response = await fetch(
    `${API_BASE_URL}/host/remove-favourite/${homeId}`,
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