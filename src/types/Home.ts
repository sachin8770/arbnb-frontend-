export interface Home {
  _id: string;
  owner: string;
  name: string;
  description: string;
  price: number;
  location: string;
  rating: number;
  photo: string;
  isAvailable: boolean;
  isFavourite?: boolean;
}