import { useFBAuthContext } from "../context/FBAuthContext";
import Spinner from "react-bootstrap/Spinner";

function Dashboard() {
  const { user, loading } = useFBAuthContext();

  if (loading)
    return (
      <div>
        <Spinner animation="border" variant="info" role="status" />
      </div>
    );

  return (
    <>
      <h1>Getting user info using Firebase authentication.</h1>
      <p>{user?.email}</p>
    </>
  );
}

export default Dashboard;
