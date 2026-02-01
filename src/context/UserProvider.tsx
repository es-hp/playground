import { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
import { useUserData } from "../hooks/useUserData";
import type { ProviderProps } from "../types/types";

export const UserProvider = ({ children }: ProviderProps) => {
  const {
    loginWithRedirect,
    logout: auth0Logout,
    user: auth0User,
    isAuthenticated,
  } = useAuth0();

  const userId = useMemo(() => {
    if (!isAuthenticated || !auth0User) return null;
    return auth0User.user_metadata?.api_user_id || null;
  }, [isAuthenticated, auth0User]);

  const { user, loading, error } = useUserData(userId);

  const login = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <UserContext.Provider
      value={{ user, userId, loading, error, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// interface LoginResponse {
//   token: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
// }

// export const UserProvider = ({ children }: ProviderProps) => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState<number | null>(null);
//   const [token, setToken] = useState(
//     () => sessionStorage.getItem("authToken") || ""
//   );
//   const { setPerson } = usePersonContext();

//   const user = useUserData(userId);

//   const login = async (
//     email: string,
//     password: string,
//     userIdValue: number
//   ) => {
//     const response = await axios.post<LoginResponse>(
//       "https://reqres.in/api/login",
//       {
//         email,
//         password,
//       },
//       {
//         headers: { "x-api-key": "reques-free-v1" },
//       }
//     );
//     const token = response.data.token;
//     setToken(token);
//     sessionStorage.setItem("authToken", token);
//     setUserId(userIdValue);
//   };

//   const logout = () => {
//     setToken("");
//     setUserId(null);
//     sessionStorage.removeItem("authToken");
//     setPerson({ name: "", isLoggedIn: false });
//     navigate("/login");
//   };

//   return (
//     <UserContext.Provider value={{ user, userId, token, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
