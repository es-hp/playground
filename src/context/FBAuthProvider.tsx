import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";
import { FBAuthContext } from "./FBAuthContext";
import type { ProviderProps } from "../types/types";

export function FBAuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <FBAuthContext.Provider value={{ user, loading }}>
      {children}
    </FBAuthContext.Provider>
  );
}
