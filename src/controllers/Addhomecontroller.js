export const Addhome = async (formData) => {
  const response = await fetch("https://arbnb-backend-testing.onrender.com/host/add-home", {
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