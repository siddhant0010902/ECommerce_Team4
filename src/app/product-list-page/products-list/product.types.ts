export interface ProductListItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string; 
  description?: string; 
  rating : number
}