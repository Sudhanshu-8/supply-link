import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import DashboardTab from "./components/DashboardTab";
import ProductsTab from "./components/ProductsTab";
import OrdersTab from "./components/OrdersTab";
import ProductModal from "./components/ProductModal";

const ALLOWED_TABS = ["dashboard", "products", "orders"];

const SupplierDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const requested = segments[1] || "dashboard"; // path: /supplierdashboard/<tab>
    return ALLOWED_TABS.includes(requested) ? requested : "dashboard";
  }, [location.pathname]);

  useEffect(() => {
    if (!ALLOWED_TABS.includes(activeTab)) {
      navigate("/supplierdashboard", { replace: true });
    }
  }, [activeTab, navigate]);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalOrders: 0
  });

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "piece",
    stock: ""
  });

  const supplierId = user?.id || user?._id;

  const matchesSupplier = useCallback(
    (supplierInfo) => {
      if (!supplierId || !supplierInfo) return false;
      const supplierValue = supplierInfo._id || supplierInfo.id || supplierInfo;
      if (!supplierValue) return false;
      const normalizedSupplier =
        typeof supplierValue === "object" && supplierValue.toString
          ? supplierValue.toString()
          : String(supplierValue);
      const normalizedUser =
        typeof supplierId === "object" && supplierId.toString
          ? supplierId.toString()
          : String(supplierId);
      return normalizedSupplier === normalizedUser;
    },
    [supplierId]
  );

  const calculateStats = useCallback(
    (productsData, ordersData) => {
      const totalProducts = productsData.length;
      const supplierOrders = ordersData.filter(
        (order) => order.items && order.items.some((item) => matchesSupplier(item.supplier))
      );
      const pendingOrders = supplierOrders.filter(
        (order) => order.status === "pending" || order.status === "processing"
      ).length;
      const totalRevenue = supplierOrders
        .filter((order) => order.status === "delivered")
        .reduce((sum, order) => {
          const orderTotal = order.items
            .filter((item) => matchesSupplier(item.supplier))
            .reduce((itemSum, item) => itemSum + (item.price || 0) * (item.quantity || 0), 0);
          return sum + orderTotal;
        }, 0);

      setStats({
        totalProducts,
        pendingOrders,
        totalRevenue,
        totalOrders: supplierOrders.length
      });
    },
    [matchesSupplier]
  );

  const fetchAllData = useCallback(async () => {
    if (!user) return;
    try {
      setFetchError(null);
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        api.get("/products/supplier/me"),
        api.get("/orders")
      ]);

      const productList = Array.isArray(productsRes.data) ? productsRes.data : [];
      const orderList = Array.isArray(ordersRes.data) ? ordersRes.data : [];

      setProducts(productList);
      setOrders(orderList);
      calculateStats(productList, orderList);
    } catch (error) {
      const message = error.response?.data?.error || "Unable to load supplier data";
      console.error("Supplier dashboard fetch error:", message, error);
      setFetchError(message);
      setProducts([]);
      setOrders([]);
      calculateStats([], []);
    } finally {
      setLoading(false);
    }
  }, [user, calculateStats]);

  useEffect(() => {
    if (!user || user.role !== "supplier") return;
    fetchAllData();
  }, [user, fetchAllData]);

  const supplierOrders = useMemo(
    () =>
      orders.filter(
        (order) => order.items && order.items.some((item) => matchesSupplier(item.supplier))
      ),
    [orders, matchesSupplier]
  );

  const handleNavigate = (tab) => {
    if (tab === "dashboard") {
      navigate("/supplierdashboard");
    } else {
      navigate(`/supplierdashboard/${tab}`);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productForm);
      } else {
        await api.post("/products", productForm);
      }
      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({
        name: "",
        description: "",
        category: "",
        price: "",
        unit: "piece",
        stock: ""
      });
      await fetchAllData();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to save product";
      console.error("Error saving product:", message, error);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      category: product.category,
      price: product.price,
      unit: product.unit,
      stock: product.stock
    });
    setShowProductModal(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${productId}`);
      fetchAllData();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to delete product";
      alert(message);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchAllData();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to update order status";
      alert(message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-700 border-blue-200",
      processing: "bg-purple-100 text-purple-700 border-purple-200",
      shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
      delivered: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex">
      <aside className="w-64 flex-col border-r border-gray-200 bg-white hidden md:flex">
        <div className="flex h-16 items-center justify-start border-b border-gray-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
              <span className="material-symbols-outlined">all_inbox</span>
            </div>
            <span className="text-lg font-bold">SupplyLink</span>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {ALLOWED_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleNavigate(tab)}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab === "dashboard" && <span className="material-symbols-outlined">dashboard</span>}
              {tab === "products" && <span className="material-symbols-outlined">inventory_2</span>}
              {tab === "orders" && <span className="material-symbols-outlined">receipt_long</span>}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <span className="material-symbols-outlined">account_circle</span>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{user?.name}</span>
              <span className="text-xs text-gray-500">Supplier</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/70 px-4 md:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
            <p className="hidden md:block text-sm text-gray-500">
              {activeTab === "dashboard" && "Overview of your products and orders"}
              {activeTab === "products" && "Manage your product listings"}
              {activeTab === "orders" && "View and manage orders"}
            </p>
          </div>
          {activeTab === "products" && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: "",
                  description: "",
                  category: "",
                  price: "",
                  unit: "piece",
                  stock: ""
                });
                setShowProductModal(true);
              }}
              className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Product
            </button>
          )}
        </header>

        <div className="p-4 md:p-6 flex-1 overflow-y-auto">
          {fetchError && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {fetchError}
            </div>
          )}

          {activeTab === "dashboard" && (
            <DashboardTab
              stats={stats}
              supplierOrders={supplierOrders}
              user={user}
              getStatusColor={getStatusColor}
              matchesSupplier={matchesSupplier}
            />
          )}
          {activeTab === "products" && (
            <ProductsTab
              products={products}
              loading={loading}
              error={fetchError}
              onAddProduct={() => {
                setEditingProduct(null);
                setProductForm({
                  name: "",
                  description: "",
                  category: "",
                  price: "",
                  unit: "piece",
                  stock: ""
                });
                setShowProductModal(true);
              }}
              onEditProduct={handleEdit}
              onDeleteProduct={handleDelete}
            />
          )}
          {activeTab === "orders" && (
            <OrdersTab
              supplierOrders={supplierOrders}
              user={user}
              getStatusColor={getStatusColor}
              matchesSupplier={matchesSupplier}
              updateOrderStatus={updateOrderStatus}
            />
          )}
        </div>
      </main>

      <ProductModal
        show={showProductModal}
        editingProduct={editingProduct}
        productForm={productForm}
        setProductForm={setProductForm}
        loading={loading}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleProductSubmit}
      />
    </div>
  );
};

export default SupplierDashboard;
