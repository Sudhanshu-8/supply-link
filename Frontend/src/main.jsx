import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./Welcome.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import VendorDashboard from "./Vendor/vendorDashboard.jsx";
import SupplierDashboard from "./Supplier/SupplierDashboard.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminSettings from "./Admin/AdminSettings.jsx";
import "./index.css";

function Main() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route
            path="/vendordashboard/*"
            element={
              <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supplierdashboard/*"
            element={
              <ProtectedRoute allowedRoles={["supplier", "admin"]}>
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admindashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-settings"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
