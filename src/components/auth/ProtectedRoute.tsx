import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { ProviderProps } from "../../types/types";

export const ProtectedRoute = ({ children }: ProviderProps) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};
