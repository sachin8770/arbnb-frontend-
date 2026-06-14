
import { API_BASE_URL } from "./apiConfig";

export const createOrder = async (homeId) => {
  const response = await fetch(
  `${API_BASE_URL}/host/create-order/${homeId}`,
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