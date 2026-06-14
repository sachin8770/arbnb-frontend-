export const signupuser = async (formData) => {
  const response = await fetch("https://arbnb-backend-testing.onrender.com/auth/signupuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to signup");
  }

  return data;
};