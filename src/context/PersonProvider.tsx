import { useState } from "react";
import { PersonContext } from "./PersonContext";
import type { Person } from "../models/Person.model";
import type { ProviderProps } from "../types/types";

export function PersonProvider({ children }: ProviderProps) {
  const [person, setPerson] = useState<Person>({
    name: "",
    isLoggedIn: false,
  });

  return (
    <PersonContext.Provider value={{ person, setPerson }}>
      {children}
    </PersonContext.Provider>
  );
}
