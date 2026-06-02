export const getHomeById = async (homeId) => {
  const response = await fetch(
    `http://localhost:3000/host/homes/${homeId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};