import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { ButtonAPICall } from "../components/ButtonAPICall";
import { vi, describe, test, expect } from "vitest";

// Mock axios to prevent actual API calls during testing
vi.mock("axios");

describe("ButtonAPICall Component", () => {
  test("fetches data from API on button click", async () => {
    const mockResponse = { data: [{ id: 1, title: "Test Todo" }] };
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    render(<ButtonAPICall />);
    fireEvent.click(screen.getByText(/fetch todos/i));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos",
      );
    });
  });

  test("matches the snapshot", () => {
    const { container } = render(<ButtonAPICall />);
    expect(container).toMatchSnapshot();
  });
});
