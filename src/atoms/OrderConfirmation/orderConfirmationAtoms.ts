import { createJSONStorage, atomWithStorage } from "jotai/utils";
import { CompletedOrder } from "../../Interface/orderConfirmation.interface";

const completedOrderStorage = createJSONStorage<CompletedOrder | null>(() => sessionStorage);
export const completedOrderAtom = atomWithStorage<CompletedOrder | null>("newProductsAppCompletedOrder", null, completedOrderStorage, { getOnInit: true });