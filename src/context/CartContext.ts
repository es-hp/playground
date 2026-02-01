import { createContext, type Dispatch } from "react";
import { useCustomContext } from "../hooks/useCustomContext";
import type { CartState, CartActions } from "../models/Cart.model";

export type CartContextType = {
  cart: CartState;
  dispatch: Dispatch<CartActions>;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function useCartContext() {
  const context = useCustomContext(CartContext, "useCartContext");
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
}
