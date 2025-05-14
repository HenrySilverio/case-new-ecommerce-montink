import { CartItem } from './cart.interface';

export interface Product extends CartItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  icon?: string;
}
