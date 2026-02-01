import type { CartState, CartActions } from "../models/Cart.model";
import { CART_ACTIONS } from "../models/Cart.model";

export function cartReducer(state: CartState, action: CartActions): CartState {
  switch (action.type) {
    case CART_ACTIONS.ADD_BOOK:
      {
        const bookExists = state.books.some(
          (book) => book.key === action.payload.key
        );
        if (bookExists) return state;
      }
      return { ...state, books: [...state.books, action.payload] };
    case CART_ACTIONS.REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.key !== action.payload),
      };
    default:
      return state;
  }
}
