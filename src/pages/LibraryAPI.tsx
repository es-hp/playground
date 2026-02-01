// React
import { useState, type ChangeEvent, type FormEvent } from "react";

// React Router
import { Link, useSearchParams } from "react-router-dom";

// Bootstrap
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";

// Hooks
import { useBookAvailability } from "../hooks/useBookAvailability";

// Context
import { useCartContext } from "../context/CartContext";

// Constants
import { CART_ACTIONS } from "../models/Cart.model";

// Types
import type { BookData } from "../hooks/useBookAvailability";

function LibraryAPI() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleInput, setTitleInput] = useState<string>("");

  const title = searchParams.get("q") || "";

  const { isLoading, books, setBooks, error, setError } =
    useBookAvailability(title);

  const { cart, dispatch } = useCartContext();
  const isInCart = (bookKey: string) =>
    cart.books?.some((book) => book.key === bookKey) ?? false;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleInput.trim()) {
      setSearchParams({ q: titleInput });
    }
    setTitleInput("");
  };

  const handleClear = () => {
    setSearchParams({});
    setTitleInput("");
    setBooks([]);
    setError(null);
  };

  const handleAdd = (book: BookData) => {
    if (!isInCart(book.key)) {
      dispatch({ type: CART_ACTIONS.ADD_BOOK, payload: book });
    }
  };

  const handleRemove = (book: BookData) => {
    if (isInCart(book.key)) {
      dispatch({ type: CART_ACTIONS.REMOVE_BOOK, payload: book.key });
    }
  };

  return (
    <Container className="border border-danger">
      <div className="p-4 w-100 mt-5 text-end">
        Books in bag:{" "}
        <Link to="/cart" className="text-decoration-none">
          {cart.books.length}
        </Link>
      </div>
      <div
        className="p-4 m-auto border border-warning w-100"
        style={{ maxWidth: "694px" }}
      >
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Label htmlFor="book-title" className="p-0">
            <h3>Search book:</h3>
          </Form.Label>
          <InputGroup className="my-3" style={{ maxWidth: "644px" }}>
            <Form.Control
              value={titleInput}
              onChange={handleChange}
              type="text"
              placeholder="i.e. The Hobbit"
              aria-label="Book title"
            />
            <Button variant="outline-primary" id="search-title" type="submit">
              Search
            </Button>
          </InputGroup>
          <Button
            variant="outline-secondary"
            id="clear-results"
            type="button"
            onClick={handleClear}
            className="mt-3"
          >
            Clear Results
          </Button>
        </Form>
      </div>
      <div
        className="my-4 d-flex flex-column gap-5 m-auto text-center w-100"
        style={{ maxWidth: "514px" }}
      >
        {isLoading && (
          <Card
            className="position-relative d-flex justify-content-center align-items-center p-5 bg-secondary bg-opacity-50"
            style={{ minHeight: "150px" }}
          >
            <div className="position-absolute z-3">
              <Spinner animation="border" role="status" />
            </div>
          </Card>
        )}
        {error && (
          <Card
            className="position-relative d-flex justify-content-center align-items-center p-5 bg-secondary bg-opacity-50"
            style={{ minHeight: "150px" }}
          >
            <div className="position-absolute z-3">
              <p className="fw-medium fs-4">{error}</p>
            </div>
          </Card>
        )}
        {books &&
          books.map((book) => (
            <Card key={book.key} className="p-5 bg-secondary text-light">
              <h3>{book.title}</h3>
              <p>
                <em>{book.author_name?.join(", ")}</em>
              </p>
              {book.isAvailable ? (
                <div className="d-flex gap-3 justify-content-center self-align-center">
                  <Badge
                    bg="success"
                    className="d-flex w-auto px-3 py-2 align-self-stretch align-items-center"
                  >
                    Available
                  </Badge>
                  {isInCart(book.key) ? (
                    <Button
                      onClick={() => handleRemove(book)}
                      variant="outline-dark"
                      size="sm"
                    >
                      Remove from bag
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAdd(book)}
                      variant="primary"
                      size="sm"
                    >
                      Add to bag
                    </Button>
                  )}
                </div>
              ) : (
                <Badge
                  bg="danger"
                  className="w-auto px-3 py-2 align-self-center"
                >
                  Not available
                </Badge>
              )}
            </Card>
          ))}
      </div>
    </Container>
  );
}

export default LibraryAPI;
