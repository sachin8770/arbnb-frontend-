export const gethomesfrmdb = async () => {
    const response = await fetch("https://arbnb-backend-testing.onrender.com/gethomes", {
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
