// // React
// import { useState } from "react";

// // React Router
// import { useNavigate } from "react-router-dom";

// // Third-Party
// import axios from "axios";

// // Bootstrap
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// // Contexts
// import { useThemeContext } from "../context/ThemeContext";
// import { useUserContext } from "../context/UserContext";

// // Hooks
// import { usePWValidation } from "../hooks/usePWValidation";

// // Types
// import { type FormEvent } from "react";

// export default function Login() {
//   const { login } = useUserContext();

//   const [email, setEmail] = useState("eve.holt@reqres.in");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { error, setError, validatePassword, isValid } = usePWValidation();
//   const [submitted, setSubmitted] = useState(false);

//   // Needed only for this example using the free api login
//   const [userIdValue, setUserIdValue] = useState<number | null>(null);

//   const { theme, setTheme } = useThemeContext();
//   const handleChangeTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       const timer = setTimeout(() => {
//         navigate("/home");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [token, navigate]);

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setSubmitted(true);
//     setError("");

//     if (!validatePassword(password) || !userIdValue) {
//       setLoading(false);
//       return;
//     }

//     try {
//       login(email, password, userIdValue);
//       setUserIdValue(null);
//       setPassword("");
//       setSubmitted(false);
//       navigate("/home");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         setError(error.response?.data?.message || "Login failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container
//       fluid
//       className={`d-flex flex-column gap-3 mb-5 p-5 ${theme}`}
//       style={{ maxWidth: "460px" }}
//     >
//       <h2>Login</h2>
//       <h3>Note: Must use this email.</h3>
//       <h4>The password can be anything.</h4>
//       <Form
//         onSubmit={handleLogin}
//         noValidate
//         className="d-flex flex-column gap-2 mb-2"
//       >
//         <Form.Group>
//           <Form.Label htmlFor="email" className="p-0 mb-2">
//             Email:
//           </Form.Label>
//           <Form.Control
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label htmlFor="userId" className="p-0 mb-2">
//             User ID:
//           </Form.Label>
//           <Form.Control
//             type="text"
//             id="userId"
//             value={userIdValue ?? ""}
//             onChange={(e) => {
//               const value = e.target.value;
//               if (/^\d{0,3}$/.test(value)) {
//                 setUserIdValue(value === "" ? null : Number(value));
//               }
//             }}
//             isInvalid={submitted && !userIdValue}
//             isValid={submitted && !!userIdValue}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             User ID required (number from 1-999)
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group>
//           <Form.Label htmlFor="password" className="p-0 mb-2">
//             Password:
//           </Form.Label>
//           <Form.Control
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             isInvalid={submitted && !isValid}
//             isValid={submitted && isValid}
//             required
//           />
//           {error && (
//             <Form.Control.Feedback type="invalid">
//               {error}
//             </Form.Control.Feedback>
//           )}
//         </Form.Group>

//         <div className="d-flex gap-3 mt-3 justify-content-center align-items-center">
//           <Button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </div>
//       </Form>
//       <Button
//         variant="secondary"
//         onClick={handleChangeTheme}
//         className="mt-auto text-nowrap align-self-center px-3"
//       >
//         Click for {theme === "light" ? "dark" : "light"} mode
//       </Button>
//     </Container>
//   );
// }
