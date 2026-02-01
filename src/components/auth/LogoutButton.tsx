import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

export function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isAuthenticated)
    return (
      <Button variant="warning" onClick={handleLogout}>
        Log Out
      </Button>
    );
  return null;
}
