import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/auth/LoginButton";

function Login3() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="d-flex justify-content-center align-items center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
        <p className="text-gray-600 mb-6 text-center">
          Sign in to access page.
        </p>
        <LoginButton />
        <p className="text-sm text-gray-500 mt-4 text-center">
          You'll be redirected to Auth0 to sign in securely.
        </p>
      </div>
    </div>
  );
}

export default Login3;
