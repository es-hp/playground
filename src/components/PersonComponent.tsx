import type { ProfileProps } from "../models/Person.model";

export function PersonComponent({ person, message }: ProfileProps) {
  return (
    <div>
      <h1>Person Details</h1>
      <h2>{person.name}</h2>
      <p>Age: {person.age}</p>
      <p>Email: {person.email || "No email provided"}</p>
      <p>Message: {message}</p>
    </div>
  );
}
