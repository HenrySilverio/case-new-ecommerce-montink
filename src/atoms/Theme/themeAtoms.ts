import { atomWithStorage, createJSONStorage } from "jotai/utils"

export type Theme = 'light' | 'dark'
const themeStorage = createJSONStorage<Theme>(() => localStorage)
export const themeAtom = atomWithStorage<Theme>('newProductsAppTheme', 'light', themeStorage, {getOnInit: true})