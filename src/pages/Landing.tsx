import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Landing() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const handleSignup = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  if (isAuthenticated) {
    return (
      <Container fluid className="p-5 m-5">
        <h1>Welcome back, {user?.name}!</h1>
        <Link to="/dashboard">Go to Dashboard</Link>
      </Container>
    );
  }
  return (
    <Container fluid className="p-5 m-5">
      <h1>Landing Page</h1>
      <Button onClick={handleSignup} className="mt-3">
        Sign Up
      </Button>
    </Container>
  );
}

export default Landing;
