import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// Combining two user/person models
import { usePersonContext } from "../context/PersonContext";

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponseData {
  data: UserData;
  support?: {
    url: string;
    text: string;
  };
}

export const useUserData = (userId: number | null) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { setPerson } = usePersonContext();

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      setUser(null);
      setPerson({ name: "", email: "", isLoggedIn: false });
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await getAccessTokenSilently();

        const response = await axios.get<UserResponseData>(
          `https://reqres.in/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const apiUser = response.data.data;
        setUser(apiUser);
        // setPerson is used to combine two different types of login for educational purposes
        setPerson({
          name: `${apiUser.first_name} ${apiUser.last_name}`,
          email: apiUser.email,
          isLoggedIn: true,
        });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred");
        }
        console.error("Error fetching user:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setPerson, userId, getAccessTokenSilently, isAuthenticated]);
  return { user, loading, error };
};

// export const useUserData = (userId: number | null) => {
//   const [user, setUser] = useState<UserData | null>(null);
//   const { setPerson } = usePersonContext();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const jwtToken = sessionStorage.getItem("authToken");

//       const response = await axios.get<UserResponseData>(
//         `https://reqres.in/api/users/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );
//       const apiUser = response.data.data;
//       setUser(apiUser);
//       // setPerson is used to combine two different types of login for educational purposes
//       setPerson({
//         name: `${apiUser.first_name} ${apiUser.last_name}`,
//         email: apiUser.email,
//         isLoggedIn: true,
//       });
//     };

//     fetchUser();
//   }, [setPerson, userId]);
//   return user;
// };

// src/features/counter/counterSlice.ts
