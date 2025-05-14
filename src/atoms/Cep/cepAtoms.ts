import { atomWithStorage, createJSONStorage } from "jotai/utils";

const cepStorage = createJSONStorage<string | null>(() => localStorage)
export const cepAtom = atomWithStorage<string | null>('newProductsAppCep', null, cepStorage, {getOnInit: true})