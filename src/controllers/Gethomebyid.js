import { API_BASE_URL } from "./apiConfig";

export const getHomeById = async (homeId) => {
  const response = await fetch(
    `${API_BASE_URL}/host/homes/${homeId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};