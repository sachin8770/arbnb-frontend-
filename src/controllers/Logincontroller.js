export const postloginuser = async (formData) => {
  const response = await fetch("http://localhost:3000/auth/loginuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to login ");
  }

  return data;
};