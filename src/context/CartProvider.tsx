import { useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "../reducers/cartReducer";
import type { ProviderProps } from "../types/types";

export function CartProvider({ children }: ProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, { books: [] });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
