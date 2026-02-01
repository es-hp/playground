// React Router
import { Routes, Route } from "react-router-dom";

// Pages
import Callback from "./pages/Callback";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Landing from "./pages/Landing";
import Login3 from "./pages/Login3";
import LibraryAPI from "./pages/LibraryAPI";
import LibraryCart from "./pages/LibraryCart";
import Register from "./pages/Register";
import Login4 from "./pages/Login4";
import FBDashboard from "./pages/FBDashboard";

// Components
import { NavBar } from "./components/layout/NavBar";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { FBProtectedRoute } from "./components/auth/FBProtectedRoute";

// Styles
import "./App.css";

function App() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="d-flex flex-grow-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login3" element={<Login3 />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <LibraryAPI />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<LibraryCart />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/callback" element={<Callback />} />
            <Route
              path="/fb-dashboard"
              element={
                <FBProtectedRoute>
                  <FBDashboard />
                </FBProtectedRoute>
              }
            />
            <Route path="/login4" element={<Login4 />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
