// React
import { useState, useEffect } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Third-Party
import { useAuth0 } from "@auth0/auth0-react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// Context
import { usePersonContext } from "../context/PersonContext";

// Component
import { CalculateAge } from "../components/AgeCalculator";
import { Directory } from "../components/Directory";
import { LogoutButton } from "../components/auth/LogoutButton";
import { Tasks } from "../components/Tasks";
import { TaskForm } from "../components/TaskForm";
import { TodoList } from "../components/TodoList";
import { User } from "../components/User";

function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { person } = usePersonContext();
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    if (!isAuthenticated || (!person.isLoggedIn && count > 0)) {
      const id = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(id);
    }

    if (!isAuthenticated || (!person.isLoggedIn && count === 0)) {
      navigate("/login");
    }
  }, [person.isLoggedIn, count, navigate, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div>
        <h3>Goodbye!</h3>
        <p>
          You are now logged out. You will automatically be redirected to login
          page in {count} seconds.
        </p>
        <Button type="button" onClick={() => navigate("/")} variant="light">
          Back to log in
        </Button>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <div className="mx-auto" style={{ maxWidth: "900px" }}>
        <h1>Welcome, {person.name}!</h1>
        <p>You are now {person.isLoggedIn ? "logged in" : "logged out"}.</p>
        <div
          className="d-flex justify-content-center"
          style={{ minWidth: "300px" }}
        >
          <User />
        </div>
        <div className="vstack gap-4 my-4">
          <Button
            variant="warning"
            type="button"
            onClick={() => navigate("/library")}
            className="mx-auto"
          >
            Library API
          </Button>
          <hr />
          <TodoList />
          <hr />
          <CalculateAge />
          <hr />
          <Tasks />
          <hr />
          <TaskForm />
          <hr />
          <Directory />
          <hr />
          <div className="m-3 align-self-center px-3">
            <LogoutButton />
          </div>
          {/* <Button
              type="button"
              variant="outline-secondary"
              className="m-3 align-self-center px-3"
              onClick={() => {
                setPerson({ name: "", isLoggedIn: false });
                setCount(10);
              }}
            >
              Log out
            </Button> */}
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
