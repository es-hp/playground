import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export interface Availability {
  status?: string;
  is_readable?: boolean;
  is_lendable?: boolean;
  borrow_url?: string;
  read_url?: string;
}

export interface BookData {
  title: string;
  author_name: string[];
  key: string;
  availability?: Availability;
  isAvailable?: boolean;
}

export interface SearchResponse {
  start: number;
  num_found: number;
  docs: BookData[];
}

export interface BookAvailability {
  isLoading: boolean;
  books: BookData[];
  setBooks: React.Dispatch<React.SetStateAction<BookData[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useBookAvailability(title: string): BookAvailability {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isBookAvailable = (book: BookData): boolean => {
    return Boolean(
      // Turns any value into a boolean. Used becaquse || operatior returns the actual value, not always a boolean.
      book.availability?.is_readable ||
        book.availability?.is_lendable ||
        book.availability?.status === "borrow_available" ||
        book.availability?.status === "full access"
    );
  };

  // In a hook, an API call must live inside a useEffect
  useEffect(() => {
    async function loadData(title: string) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<SearchResponse>(
          "https://openlibrary.org/search.json",
          {
            params: {
              title: title,
              page: 1,
              limit: 10,
              fields: "title,author_name,availability,key,*", // Can do "*" to get all fields
            },
          }
        );
        const data = response.data;
        setBooks(
          data.docs.map((book) => ({
            ...book,
            isAvailable: isBookAvailable(book),
          }))
        );
      } catch (err) {
        const e = err as AxiosError;
        setError(
          e.response ? `Error ${e.response.status}: ${e.message}` : e.message
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (title) loadData(title);
  }, [title]);

  return { isLoading, books, setBooks, error, setError };
}
