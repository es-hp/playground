import { createContext, type Dispatch } from "react";
import type { Person } from "../models/Person.model";
import { useCustomContext } from "../hooks/useCustomContext";

export type PersonContextType = {
  person: Person;
  setPerson: Dispatch<React.SetStateAction<Person>>;
};

export const PersonContext = createContext<PersonContextType | undefined>(
  undefined
);

export function usePersonContext() {
  return useCustomContext(PersonContext, "usePersonContext");
}
