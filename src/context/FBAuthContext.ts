import { createContext } from "react";
import type { User } from "firebase/auth";
import { useCustomContext } from "../hooks/useCustomContext";

export type FBAuthContextType = {
  user: User | null;
  loading: boolean;
};

export const FBAuthContext = createContext<FBAuthContextType | undefined>(
  undefined,
);

export function useFBAuthContext() {
  return useCustomContext(FBAuthContext, "useFBAuthContext");
}
