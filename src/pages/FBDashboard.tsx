import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useFBAuthContext } from "../context/FBAuthContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function FBDashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { user } = useFBAuthContext();
  const [displayName, setDisplayName] = useState("");

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(user, { displayName });
      setDisplayName("");
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
      navigate("/login4");
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
      <h1>Welcome {user?.displayName ? user.displayName : "new user"}!</h1>
      <h2>Logged in using Firebase authentication!</h2>
      <div>
        <h3>Update name</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <FloatingLabel controlId="displayName" label="Display Name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Set name
          </Button>
        </Form>
      </div>
      <Button
        variant="info"
        type="button"
        onClick={handleLogout}
        className="mx-auto mt-5"
      >
        Log Out
      </Button>
      {error && <p>{error}</p>}
    </Container>
  );
}

export default FBDashboard;
