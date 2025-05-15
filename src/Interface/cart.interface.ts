export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  icon?: React.ReactNode;
  selectedSize?: string;
  selectedColor?: string;
}