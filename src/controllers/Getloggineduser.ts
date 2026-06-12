import { ApiResponse } from "../types/Apiresponse";

export interface User {
  _id: string;
  username: string;
  email: string;
 
}
interface UserData {
  user: User;
}
export const getloginuser = async () => {
    const response = await fetch("http://localhost:3000/auth/getloginuser", {
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
