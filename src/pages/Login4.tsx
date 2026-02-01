import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useFBAuthContext } from "../context/FBAuthContext";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Login4() {
  const navigate = useNavigate();

  const { user } = useFBAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/fb-dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error");
      }
    }
  };

  return (
    <Container>
      <h1>Login using Firebase:</h1>
      {!user ? (
        <div style={{ maxWidth: "600px" }} className="mt-5">
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <FloatingLabel
                controlId="email"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel
                controlId="password"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            {error && <p>{error}</p>}
          </Form>
        </div>
      ) : (
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="mx-auto mt-5"
        >
          Logout
        </Button>
      )}
    </Container>
  );
}

export default Login4;
