export const Addhome = async (formData) => {
  const response = await fetch("http://localhost:3000/host/add-home", {
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