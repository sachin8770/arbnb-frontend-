import { API_BASE_URL } from "./apiConfig";

export const Addhome = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/host/add-home`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add home");
  }
  console.log(data);
  return data;
};