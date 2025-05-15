import { CartItem } from "./cart.interface";
import { ViaCepResponse } from "./viaCep.interface";

export interface CompletedOrder {
  items: CartItem[];
  total: number;
  deliveryDate: string | null;
  address: ViaCepResponse | null;
  orderTimestamp: number;
}