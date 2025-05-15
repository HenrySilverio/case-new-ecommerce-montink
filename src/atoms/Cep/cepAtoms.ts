import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { ViaCepResponse } from "../../Interface/viaCep.interface";
import { atom } from "jotai";

const cepStorage = createJSONStorage<string | null>(() => localStorage);
export const cepAtom = atomWithStorage<string | null>("newProductsAppCep", null, cepStorage, { getOnInit: true });

export const addressAtom = atom<ViaCepResponse | null>(null);
export const cepErrorAtom = atom<string | null>(null);