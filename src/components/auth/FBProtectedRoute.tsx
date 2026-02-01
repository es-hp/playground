import { Navigate } from "react-router-dom";
import { useFBAuthContext } from "../../context/FBAuthContext";
import type { ProviderProps } from "../../types/types";

export const FBProtectedRoute = ({ children }: ProviderProps) => {
  const { user, loading } = useFBAuthContext();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" replace />;

  return children;
};
