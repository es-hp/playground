import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "react-bootstrap/Spinner";

function Dashboard() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading)
    return (
      <div>
        <Spinner animation="border" variant="info" role="status" />
      </div>
    );

  if (!isAuthenticated) return null;

  return (
    <>
      <h1>Hello world!</h1>
    </>
  );
}

export default Dashboard;
