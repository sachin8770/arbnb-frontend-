import { ApiResponse } from "../types/Apiresponse";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  favourites: string[];
}
interface UserData {
  user: User;
}
export const getloginuser = async () => {
    const response = await fetch("https://arbnb-backend-testing.onrender.com/getloginuser", {
        method: "GET",
        credentials:"include",
        headers: {
            "Content-Type": "application/json",
        },
    });

   const data: ApiResponse<UserData> = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch homes");
    }
    console.log(data);
    return data;
}
