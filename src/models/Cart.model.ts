import type { BookData } from "../hooks/useBookAvailability";

export interface CartState {
  books: BookData[];
}

export const CART_ACTIONS = {
  ADD_BOOK: "add_book",
  REMOVE_BOOK: "remove_book",
} as const;

export type CartActions =
  | { type: typeof CART_ACTIONS.ADD_BOOK; payload: BookData }
  | { type: typeof CART_ACTIONS.REMOVE_BOOK; payload: string };
