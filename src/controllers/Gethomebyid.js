export const getHomeById = async (homeId) => {
  const response = await fetch(
    `https://arbnb-backend-testing.onrender.com/host/homes/${homeId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};