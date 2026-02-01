import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

export function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  if (!isAuthenticated)
    return (
      <Button variant="info" onClick={handleLogin}>
        Log In
      </Button>
    );
  return null;
}
