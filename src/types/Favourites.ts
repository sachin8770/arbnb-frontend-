export interface Favourite {
  _id: string;
  owner: string;
  name: string;
  price: number;
  location: string;
  rating: number | null;
  photo: string;
  __v: number;
}