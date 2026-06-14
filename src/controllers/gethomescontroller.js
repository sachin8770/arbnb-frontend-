import { API_BASE_URL } from "./apiConfig";

export const gethomesfrmdb = async () => {
    const response = await fetch(`${API_BASE_URL}/gethomes`, {
        method: "GET",
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch homes");
    }
    console.log(data);
    return data;
}
