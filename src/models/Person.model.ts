export interface Person {
  name: string;
  age?: number;
  email?: string;
  isLoggedIn: boolean;
}

export interface ProfileProps {
  person: Person;
  message: string;
}
