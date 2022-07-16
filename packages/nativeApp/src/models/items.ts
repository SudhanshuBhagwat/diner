export interface Item {
  id: number;
  name: string;
  restaurant: string;
  imageUrl: string;
  badges?: string[];
  description: string;
  price: number;
}
