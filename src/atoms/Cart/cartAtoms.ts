import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { CartItem } from '../../Interface/cart.interface';

const cartStorage = createJSONStorage<CartItem[]>(() => localStorage);
export const cartItemsAtom = atomWithStorage<CartItem[]>("newProductsAppCart", [], cartStorage, { getOnInit: true });

export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
});

export const cartItemCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((count, item) => count + item.quantity, 0);
});

export const cartDrawerOpenAtom = atom(false);
