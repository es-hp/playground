import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error");
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <FloatingLabel
            controlId="floatingEmail"
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
            controlId="floatingPassword"
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
          Register
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  );
}

export default Register;
