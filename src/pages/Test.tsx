import { useState } from "react";
import axios from "axios";
import type { FormEvent } from "react";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const postData = { title, body, userId };

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", postData);
      setIsLoading(false);
      alert("Post successful.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            placeholder="Your message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isLoading}
            rows={5}
            required
          />
        </div>
        <div>
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};
