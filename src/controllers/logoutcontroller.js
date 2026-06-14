export const postlogoutuser = async () => {
  
    const response = await fetch("https://arbnb-backend-testing.onrender.com/auth/logoutuser", {
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