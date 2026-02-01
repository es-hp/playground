import { createContext } from "react";
import { useCustomContext } from "../hooks/useCustomContext";
import { type UserData } from "../hooks/useUserData";

export type UserContextType = {
  user: UserData | null;
  userId: number | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function useUserContext() {
  return useCustomContext(UserContext, "useUserContext");
}

// export type UserContextType = {
//   user: UserData | null;
//   userId: number | null;
//   token: string;
//   login: () => Promise<void>;
//   logout: () => void;
// };
