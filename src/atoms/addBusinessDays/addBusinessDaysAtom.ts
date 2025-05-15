import { atom } from "jotai";
import { cartItemsAtom } from "../Cart/cartAtoms";
import { cepAtom } from "../Cep/cepAtoms";

export function addBusinessDays(startDate: Date, days: number): Date {
  let currentDate = new Date(startDate);
  let addedDays = 0;
  while (addedDays < days) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }
  return currentDate;
}

export const estimatedDeliveryDateAtom = atom((get) => {
  const currentCep = get(cepAtom);
  const itemsInCart = get(cartItemsAtom);

  if (currentCep && itemsInCart.length > 0) {
    const today = new Date();
    const deliveryDate = addBusinessDays(today, 5);
    return deliveryDate.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return null;
});