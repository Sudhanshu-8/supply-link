import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import VendorDashboard from "./Vendor/vendorDashboard.jsx"; // ✅ Import
import SupplierDashboard from "./Supplier/SupplierDashboard.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminSettings from "./Admin/AdminSettings.jsx";
import "./index.css";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} /> {/* ✅ New Route */}
        <Route path="/supplierdashboard" element={<SupplierDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
