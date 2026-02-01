import { useState, type FormEvent } from "react";
import { usePersonContext } from "../context/PersonContext";
import { useThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useValidation } from "../hooks/useValidation";

function Login() {
  const [username, setUsername] = useState<string>("");
  const { setPerson } = usePersonContext();
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeContext();
  const { validated, handleValidation } = useValidation();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    const login = () => {
      setPerson({
        name: username,
        isLoggedIn: true,
      });
      navigate("/home");
    };
    handleValidation(e, login);
  };

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <Container
        className={`d-flex flex-column justify-content-start align-items-center gap-3 ${theme} rounded-3 shadow p-5`}
        id="box"
        style={{ minHeight: "426px", maxWidth: "720px" }}
      >
        <h2 className="mt-3">Login</h2>
        <Form onSubmit={handleLogin} noValidate validated={validated}>
          <Form.Group
            controlId="usernameInput"
            className="d-flex flex-column gap-2 mb-4"
          >
            <Form.Label className="w-100 p-0">Username</Form.Label>
            <InputGroup style={{ width: "360px" }}>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid" className="text-start">
                Please enter a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <button
          type="button"
          onClick={handleChangeTheme}
          className="btn btn-secondary mt-auto text-nowrap align-self-center px-3"
        >
          Click for {theme === "light" ? "dark" : "light"} mode
        </button>
      </Container>
    </div>
  );
}

export default Login;
