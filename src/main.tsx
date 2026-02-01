import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// React Router
import { BrowserRouter } from "react-router-dom";

// Providers
import { Auth0ProviderWithNavigate } from "./context/Auth0Provider.tsx";
import { FBAuthProvider } from "./context/FBAuthProvider.tsx";
import { CartProvider } from "./context/CartProvider";
import { PersonProvider } from "./context/PersonProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { UserProvider } from "./context/UserProvider";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <FBAuthProvider>
          <PersonProvider>
            <UserProvider>
              <ThemeProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </ThemeProvider>
            </UserProvider>
          </PersonProvider>
        </FBAuthProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>,
);
