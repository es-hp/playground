import { CART_ACTIONS } from "../models/Cart.model";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function LibraryCart() {
  const { cart, dispatch } = useCartContext();

  const removeBook = (bookKey: string) => {
    dispatch({ type: CART_ACTIONS.REMOVE_BOOK, payload: bookKey });
  };

  return (
    <div className="p-5 vw-100 vh-100">
      <Link to="/library" className="btn btn-secondary mb-4 ">
        Back to browse
      </Link>
      <div>
        <div className="d-flex flex-column gap-3 border border-danger">
          {cart.books.length > 0 ? (
            cart.books.map((book) => {
              return (
                <div key={book.key} className="p-3 border border-secondary">
                  <h4>{book.title}</h4>
                  <p>
                    <em>{book.author_name?.join(", ")}</em>
                  </p>
                  <button
                    onClick={() => removeBook(book.key)}
                    className="btn btn-link text-decoration-none p-0 text-danger"
                  >
                    Remove
                  </button>
                </div>
              );
            })
          ) : (
            <div>
              <p>No books in cart</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LibraryCart;
