import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import type { ProviderProps } from "../types/types";

export const Auth0ProviderWithNavigate = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri =
    import.meta.env.VITE_AUTH0_CALLBACK_URL ??
    `${window.location.origin}/callback`;

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    console.error("Auth0 configuration missing");
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
