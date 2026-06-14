import { API_BASE_URL } from "./apiConfig";

export const postlogoutuser = async () => {
  
    const response = await fetch(`${API_BASE_URL}/auth/logoutuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to login ");
  }

  return data;
};