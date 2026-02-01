import { useUserContext } from "../context/UserContext";
import Card from "react-bootstrap/Card";

export function User() {
  const { user } = useUserContext();

  return (
    <div style={{ flex: "0.5" }}>
      {user && (
        <Card>
          <Card.Img variant="top" src={user.avatar} />
          <Card.Body>
            <Card.Title>
              {user.first_name} {user.last_name}
            </Card.Title>
            <Card.Text>
              <a href="mailto:{user.data.email}">{user.email}</a>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
