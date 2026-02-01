// React Router
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Context
import { usePersonContext } from "../../context/PersonContext";
import { useUserContext } from "../../context/UserContext";

// Components
import { LoginButton } from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";

export function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  const { person } = usePersonContext();
  const isLoggedIn = person.isLoggedIn;

  const { user, logout } = useUserContext();

  return (
    <>
      <Navbar
        data-bs-theme="dark"
        className="d-flex align-items-center py-3 px-4"
      >
        <Navbar.Brand>Playground</Navbar.Brand>
        <Nav className="d-flex gap-2 ms-auto align-items-center">
          {isAuthenticated || isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/library">
                Find Books
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Bag
              </Nav.Link>
            </>
          ) : null}
          <Nav.Link as={Link} to="/login4">
            Login Using Firebase
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
          {!isLoggedIn && (
            <Button onClick={() => navigate("/login")} variant="warning">
              API Login
            </Button>
          )}
          {isLoggedIn && (
            <Button onClick={logout} variant="secondary">
              API Logout
            </Button>
          )}
          {!isAuthenticated && (
            <>
              <LoginButton />
            </>
          )}
          {isAuthenticated && (
            <>
              <LogoutButton />
            </>
          )}
          {isLoggedIn && user && (
            <img
              src={user.avatar}
              className="rounded-circle"
              style={{ height: "2.5rem" }}
            />
          )}
        </Nav>
      </Navbar>
    </>
  );
}
