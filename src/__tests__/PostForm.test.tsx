// Testing Libraries
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Vitest testing utilities
import { vi, describe, test, expect } from "vitest";

// Third-Party libraries
import axios from "axios";

// Local imports
import { PostForm } from "../components/PostForm";
import type { PostData, PostResponse } from "../components/PostForm";

// Replace axios with a mock
vi.mock("axios");

// Manually write the type for the mock axios response for TS
const mockedAxios = axios as unknown as {
  post: vi.Mock<Promise<{ data: PostResponse }>, [string, PostData]>;
};

describe("PostForm Component Integration Test", () => {
  test("submits the form data correctly", async () => {
    // Tell the mock what to return when post is called
    mockedAxios.post.mockResolvedValue({
      data: { id: 1, title: "Hello", body: "World", userId: 123 },
    });

    render(<PostForm />);

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/title/i), "Hello");
    await userEvent.type(screen.getByLabelText(/body/i), "World");
    await userEvent.type(screen.getByLabelText(/user id/i), "123");

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Assert: axios.post was called with the right data
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "Hello",
        body: "World",
        userId: 123,
      },
    );
  });
});
