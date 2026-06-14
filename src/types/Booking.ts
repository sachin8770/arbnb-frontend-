import { Home } from "./Home";

export interface Booking {
  _id: string;
  guest: string;
  home: Home;
  owner: string;
  amount: number;
  bookingStatus: "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
