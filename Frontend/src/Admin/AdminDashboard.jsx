import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import DashboardTab from "./components/DashboardTab";
import UsersTab from "./components/UsersTab";
import OrdersTab from "./components/OrdersTab";
import AnalyticsTab from "./components/AnalyticsTab";

const ALLOWED_TABS = ["dashboard", "users", "orders", "analytics"];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const requested = segments[1] || "dashboard"; // /admindashboard/<tab>
    return ALLOWED_TABS.includes(requested) ? requested : "dashboard";
  }, [location.pathname]);

  useEffect(() => {
    if (!ALLOWED_TABS.includes(activeTab)) {
      navigate("/admindashboard", { replace: true });
    }
  }, [activeTab, navigate]);

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("");
  const [stats, setStats] = useState({
    totalVendors: 0,
    totalSuppliers: 0,
    totalAdmins: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setFetchError(null);
    setLoading(true);

    try {
      const [usersRes, ordersRes, productsRes, userStatsRes] = await Promise.all([
        api.get("/users", { params: { search: userSearch, role: userRoleFilter } }),
        api.get("/orders"),
        api.get("/products"),
        api.get("/users/stats")
      ]);

      const usersData = Array.isArray(usersRes.data) ? usersRes.data : [];
      const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const productsData = Array.isArray(productsRes.data) ? productsRes.data : [];
      const userStats = userStatsRes.data || {};

      setUsers(usersData);
      setOrders(ordersData);
      setProducts(productsData);

      const revenue = ordersData
        .filter((order) => order.status === "delivered")
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      setStats({
        totalVendors: userStats.vendors || 0,
        totalSuppliers: userStats.suppliers || 0,
        totalAdmins: userStats.admins || 0,
        totalUsers: userStats.totalUsers || usersData.length,
        totalOrders: ordersData.length,
        totalRevenue: revenue,
        totalProducts: productsData.length,
        pendingOrders: ordersData.filter((o) => o.status === "pending").length
      });
    } catch (error) {
      const message = error.response?.data?.error || "Failed to load admin dashboard data";
      console.error("Admin dashboard fetch error:", message, error);
      setFetchError(message);
      setUsers([]);
      setOrders([]);
      setProducts([]);
      setStats((prev) => ({
        ...prev,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        pendingOrders: 0
      }));
    } finally {
      setLoading(false);
    }
  }, [userSearch, userRoleFilter]);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    fetchAllData();
  }, [user, userSearch, userRoleFilter, fetchAllData]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getRoleColor = (role) => {
    const colors = {
      vendor: "bg-blue-100 text-blue-800",
      supplier: "bg-green-100 text-green-800",
      admin: "bg-purple-100 text-purple-800"
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const handleNavigate = (tab) => {
    if (tab === "dashboard") {
      navigate("/admindashboard");
    } else {
      navigate(`/admindashboard/${tab}`);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="flex h-full grow">
          <aside className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
              <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
              {ALLOWED_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleNavigate(tab)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {tab === "dashboard" && <span className="material-symbols-outlined">dashboard</span>}
                  {tab === "users" && <span className="material-symbols-outlined">group</span>}
                  {tab === "orders" && <span className="material-symbols-outlined">receipt_long</span>}
                  {tab === "analytics" && <span className="material-symbols-outlined">analytics</span>}
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <span className="material-symbols-outlined">account_circle</span>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user?.name}</span>
                  <span className="text-xs text-gray-500">Admin</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900 w-full"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </aside>

          <main className="flex-1 p-8 overflow-y-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
              <p className="mt-1 text-sm text-gray-600">
                {activeTab === "dashboard" && "Overview of system operations and user management"}
                {activeTab === "users" && "Manage and view all registered users"}
                {activeTab === "orders" && "View and monitor all orders in the system"}
                {activeTab === "analytics" && "System analytics and statistics"}
              </p>
            </div>

            {fetchError && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {fetchError}
              </div>
            )}

            {activeTab === "dashboard" && (
              <DashboardTab
                stats={stats}
                orders={orders}
                loading={loading}
                getStatusColor={getStatusColor}
              />
            )}
            {activeTab === "users" && (
              <UsersTab
                users={users}
                loading={loading}
                userSearch={userSearch}
                setUserSearch={setUserSearch}
                userRoleFilter={userRoleFilter}
                setUserRoleFilter={setUserRoleFilter}
                getRoleColor={getRoleColor}
              />
            )}
            {activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                loading={loading}
                getStatusColor={getStatusColor}
              />
            )}
            {activeTab === "analytics" && (
              <AnalyticsTab
                orders={orders}
                stats={stats}
                getStatusColor={getStatusColor}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
